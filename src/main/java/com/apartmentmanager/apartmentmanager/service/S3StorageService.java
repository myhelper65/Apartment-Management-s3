package com.apartmentmanager.apartmentmanager.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class S3StorageService {

    private final S3Client s3Client;

    @Value("${aws.bucketName}") // Standardized key matching application.properties
    private String bucketName;

    // Spring will automatically inject the S3Client bean from AwsConfig here
    public S3StorageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    /**
     * Uploads a file directly into a structured path: community-name/apartment-id/filename
     */
    public String uploadApartmentDocument(String communityName, String apartmentId, String fileCategory, MultipartFile file) throws IOException {
        String folderCommunity = sanitizePath(communityName);
        String folderApartment = sanitizePath(apartmentId);

        // CRITICAL UPDATE: Sanitize original file name to prevent Path Traversal / XSS
        String safeFileName = getSafeFileName(file.getOriginalFilename());
        String uniqueFileName = fileCategory + "_" + UUID.randomUUID() + "_" + safeFileName;
        String s3Key = String.format("%s/%s/%s", folderCommunity, folderApartment, uniqueFileName);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .contentType(file.getContentType())
                .build();

        // Optimized payload streaming to S3 using input stream
        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        return s3Key;
    }

    /**
     * Lists all file keys belonging to a specific apartment inside a community
     */
    public List<String> listApartmentDocuments(String communityName, String apartmentId) {
        String folderCommunity = sanitizePath(communityName);
        String folderApartment = sanitizePath(apartmentId);
        String prefix = String.format("%s/%s/", folderCommunity, folderApartment);

        ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(prefix)
                .build();

        ListObjectsV2Response res = s3Client.listObjectsV2(listObjectsV2Request);

        return res.contents().stream()
                .map(S3Object::key)
                .collect(Collectors.toList());
    }

    private String sanitizePath(String input) {
        if (input == null) return "unknown";
        return input.trim()
                .toLowerCase()
                .replaceAll("[^a-zA-Z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
    }

    /**
     * Helper to safely sanitize user-provided file names.
     */
    private String getSafeFileName(String originalFileName) {
        if (originalFileName == null || originalFileName.trim().isEmpty()) {
            return "unnamed_file";
        }
        String extension = "";
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex > 0) { // Extract extension if it exists
            extension = originalFileName.substring(dotIndex).toLowerCase();
            originalFileName = originalFileName.substring(0, dotIndex);
        }
        // Strip everything except alphanumeric, hyphens, and underscores
        String safeBaseName = originalFileName.replaceAll("[^a-zA-Z0-9_-]", "_");
        return safeBaseName + extension;
    }

    /**
     * S3'teki gizli bir dosya için 15 dakikalık geçici ve güvenli bir link üretir
     */
    public String generatePresignedUrl(String objectKey) {
        try (S3Presigner presigner = S3Presigner.create()) {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder().bucket(bucketName).key(objectKey).build();

            GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder().signatureDuration(Duration.ofMinutes(15)) // Link 15 dakika sonra kendini imha eder
                    .getObjectRequest(getObjectRequest).build();

            return presigner.presignGetObject(presignRequest).url().toString();
        }
    }

    /**
     * Permanently deletes a file from the S3 bucket using its key
     */
    public void deleteFileByKey(String key) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder().bucket(bucketName).key(key).build();
            s3Client.deleteObject(deleteObjectRequest);
        } catch (Exception e) {
            System.err.println("Failed to delete file from S3: " + key);
        }
    }

    // 1. Sitenin tüm S3 klasörünü kökten siler (Site Silinince)
    public void deleteCommunityFiles(String communityName) {
        String prefix = sanitizePath(communityName) + "/";
        deleteFilesByPrefix(prefix);
    }

    // 2. Sadece bir Dairenin tüm S3 klasörünü siler (Daire Silinince)
    public void deleteApartmentFiles(String communityName, String apartmentId) {
        String prefix = String.format("%s/%s/", sanitizePath(communityName), sanitizePath(apartmentId));
        deleteFilesByPrefix(prefix);
    }

    // 3. Sadece bir iş emrinin tüm S3 klasörünü siler
    public void deleteWorkOrderFiles(String communityName, String apartmentId, String workOrderId) {
        String prefix = String.format("%s/%s/%s/", sanitizePath(communityName), sanitizePath(apartmentId), workOrderId);
        deleteFilesByPrefix(prefix);
    }

    // Toplu silme işlemini yapan AWS mantığı (HIGH RISK UPDATE: Paginated Batch Deletion)
    private void deleteFilesByPrefix(String prefix) {
        try {
            ListObjectsV2Request listRequest = ListObjectsV2Request.builder().bucket(bucketName).prefix(prefix).build();

            // Use Paginator to handle sets > 1000 objects. Each page inherently contains up to 1000 items.
            s3Client.listObjectsV2Paginator(listRequest).stream().forEach(page -> {
                List<ObjectIdentifier> identifiers = page.contents().stream()
                        .map(s3Object -> ObjectIdentifier.builder().key(s3Object.key()).build())
                        .collect(Collectors.toList());

                if (!identifiers.isEmpty()) {
                    // AWS DeleteObjectsRequest accepts up to 1000 keys per request
                    DeleteObjectsRequest deleteRequest = DeleteObjectsRequest.builder()
                            .bucket(bucketName)
                            .delete(Delete.builder().objects(identifiers).build())
                            .build();
                    s3Client.deleteObjects(deleteRequest);
                }
            });
        } catch (Exception e) {
            System.err.println("S3 Toplu Silme Başarısız (S3 Bulk Delete Failed): " + prefix + " | Hata: " + e.getMessage());
        }
    }

    /**
     * YENİ: Her iş emrine (Work Order) özel klasör oluşturarak S3'e yükleme yapar.
     * Yol: communityName / apartmentId / workOrderId / unique_filename
     */
    public String uploadWorkOrderDocument(String communityName, String apartmentId, String workOrderId, String fileCategory, MultipartFile file) throws IOException {
        String folderCommunity = sanitizePath(communityName);
        String folderApartment = sanitizePath(apartmentId);

        // CRITICAL UPDATE: Sanitize original file name
        String safeFileName = getSafeFileName(file.getOriginalFilename());
        String uniqueFileName = fileCategory + "_" + UUID.randomUUID() + "_" + safeFileName;

        // S3 Yolu: /site/daire/WI-ABD-R476-234/dosya.png
        String s3Key = String.format("%s/%s/%s/%s", folderCommunity, folderApartment, workOrderId, uniqueFileName);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        return s3Key;
    }
}