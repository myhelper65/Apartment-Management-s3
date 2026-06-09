//package com.apartmentmanager.apartmentmanager.service;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//import software.amazon.awssdk.core.sync.RequestBody;
//import software.amazon.awssdk.services.s3.S3Client;
//import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
//import software.amazon.awssdk.services.s3.model.PutObjectRequest;
//import software.amazon.awssdk.services.s3.model.S3Object;
//
//import java.io.IOException;
//import java.util.List;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//@Slf4j
//@Service
//public class S3StorageService {
//
//    private final S3Client s3Client;
//
//    @Value("${aws.bucketName}")
//    private String bucketName;
//
//    public S3StorageService(S3Client s3Client) {
//        this.s3Client = s3Client;
//    }
//
//    /**
//     * YENİ: WorkOrder (İş Emri) için hiyerarşik yükleme
//     * S3 Yolu: communityName/apartmentId/workOrderId/fileCategory_UUID_fileName
//     */
//    public String uploadWorkOrderDocument(String communityName, String apartmentId, String workOrderId, String fileCategory, MultipartFile file) throws IOException {
//        String path = String.format("%s/%s/%s",
//                sanitizePath(communityName),
//                sanitizePath(apartmentId),
//                sanitizePath(workOrderId));
//
//        return performUpload(path, fileCategory, file);
//    }
//
//    /**
//     * ESKİ: Apartman bazlı yükleme (Geriye uyumluluk için tutabilirsiniz)
//     */
//    public String uploadApartmentDocument(String communityName, String apartmentId, String fileCategory, MultipartFile file) throws IOException {
//        String path = String.format("%s/%s",
//                sanitizePath(communityName),
//                sanitizePath(apartmentId));
//
//        return performUpload(path, fileCategory, file);
//    }
//
//    /**
//     * Ortak Yükleme Metodu (Kod tekrarını engeller)
//     */
//    private String performUpload(String path, String fileCategory, MultipartFile file) throws IOException {
//        String uniqueFileName = fileCategory + "_" + UUID.randomUUID() + "_" + file.getOriginalFilename();
//        String s3Key = path + "/" + uniqueFileName;
////
////        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
////                .bucket(bucketName)
////                .key(s3Key)
////                .contentType(file.getContentType())
////                .build();
//
////        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
//
//        return s3Key;
//    }
//
//    /**
//     * Belirli bir iş emrine ait dosyaları listeler
//     */
//    public List<String> listWorkOrderDocuments(String communityName, String apartmentId, String workOrderId) {
//        String prefix = String.format("%s/%s/%s/",
//                sanitizePath(communityName),
//                sanitizePath(apartmentId),
//                sanitizePath(workOrderId));
//
//        ListObjectsV2Request request = ListObjectsV2Request.builder()
//                .bucket(bucketName)
//                .prefix(prefix)
//                .build();
//
//        return s3Client.listObjectsV2(request).contents().stream()
//                .map(S3Object::key)
//                .collect(Collectors.toList());
//    }
//
//    private String sanitizePath(String input) {
//        if (input == null) return "unknown";
//        return input.trim()
//                .toLowerCase()
//                .replaceAll("[^a-zA-Z0-9\\s-]", "")
//                .replaceAll("\\s+", "-");
//    }
//}
//
//
//
//


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
        String originalFileName = file.getOriginalFilename();
        String uniqueFileName = fileCategory + "_" + UUID.randomUUID() + "_" + originalFileName;
        String s3Key = String.format("%s/%s/%s", folderCommunity, folderApartment, uniqueFileName);
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .contentType(file.getContentType())

                .build();

//
//// Optimized payload streaming to S3 using input stream
//
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

    // Toplu silme işlemini yapan AWS mantığı
    private void deleteFilesByPrefix(String prefix) {
        try {
            ListObjectsV2Request listRequest = ListObjectsV2Request.builder().bucket(bucketName).prefix(prefix).build();
            ListObjectsV2Response listResponse = s3Client.listObjectsV2(listRequest);

            for (S3Object s3Object : listResponse.contents()) {
                deleteFileByKey(s3Object.key());
            }
        } catch (Exception e) {
            System.err.println("S3 Toplu Silme Başarısız: " + prefix);
        }
    }


    // ... Eski kodlarının altına bunları ekle ...

    /**
     * YENİ: Her iş emrine (Work Order) özel klasör oluşturarak S3'e yükleme yapar.
     * Yol: communityName / apartmentId / workOrderId / unique_filename
     */
    // 1. Long yerine String workOrderId alıyoruz
    public String uploadWorkOrderDocument(String communityName, String apartmentId, String workOrderId, String fileCategory, MultipartFile file) throws IOException {
        String folderCommunity = sanitizePath(communityName);
        String folderApartment = sanitizePath(apartmentId);
        String uniqueFileName = fileCategory + "_" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        // S3 Yolu: /site/daire/WI-ABD-R476-234/dosya.png
        String s3Key = String.format("%s/%s/%s/%s", folderCommunity, folderApartment, workOrderId, uniqueFileName);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder().bucket(bucketName).key(s3Key).contentType(file.getContentType()).build();
        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        return s3Key;
    }

    // 2. Long yerine String workOrderId alıyoruz
    public void deleteWorkOrderFiles(String communityName, String apartmentId, String workOrderId) {
        String prefix = String.format("%s/%s/%s/", sanitizePath(communityName), sanitizePath(apartmentId), workOrderId);
        deleteFilesByPrefix(prefix);
    }}

