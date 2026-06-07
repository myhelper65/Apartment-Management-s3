package com.apartmentmanager.apartmentmanager.controller;

import com.apartmentmanager.apartmentmanager.entity.Apartment;
import com.apartmentmanager.apartmentmanager.entity.ApartmentItem;
import com.apartmentmanager.apartmentmanager.exceptions.ResourceNotFoundException;
import com.apartmentmanager.apartmentmanager.repository.ApartmentItemRepository;
import com.apartmentmanager.apartmentmanager.repository.ApartmentRepository;
import com.apartmentmanager.apartmentmanager.service.S3StorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*") 
public class ApartmentItemController {

    private final ApartmentRepository apartmentRepository;
    private final ApartmentItemRepository itemRepository;
    private final S3StorageService s3StorageService;

    @Value("${aws.bucketName}")
    private String bucketName;

    public ApartmentItemController(ApartmentRepository apartmentRepository,
                                   ApartmentItemRepository itemRepository,
                                   S3StorageService s3StorageService) {
        this.apartmentRepository = apartmentRepository;
        this.itemRepository = itemRepository;
        this.s3StorageService = s3StorageService;
    }

    // 1. YENİ İŞ EMRİ EKLEME VE DOSYALARI S3'E YÜKLEME
    @PostMapping("/api/apartments/{apartmentId}/items")
    public ResponseEntity<ApartmentItem> createItem(
            @PathVariable String apartmentId,
            @RequestParam("title") String title,
            @RequestParam("price") String price,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "date", required = false) String date,
            @RequestParam(value = "notes", required = false) String notes,
            @RequestParam(value = "status", defaultValue = "Todo") String status,
            @RequestParam(value = "attachments", required = false) List<MultipartFile> files) {

        Apartment apartment = apartmentRepository.findById(apartmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Apartment not found"));
        String communityName = apartment.getCommunity().getName();

        ApartmentItem newItem = new ApartmentItem();
        newItem.setTitle(title);
        newItem.setPrice(price);
        newItem.setCategory(category);
        newItem.setDate(date);
        newItem.setNotes(notes);
        newItem.setStatus(status);
        newItem.setApartment(apartment);

        // Frontend'den gelen her dosyayı tek tek S3'e yükle ve URL'sini kaydet
        List<String> fileUrls = new ArrayList<>();
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                try {
                    String s3Key = s3StorageService.uploadApartmentDocument(communityName, apartmentId, "doc", file);
                    fileUrls.add("/api/files/preview?key=" + s3Key);
                } catch (IOException e) {
                    System.err.println("S3 Upload Hatası: " + file.getOriginalFilename());
                }
            }
        }
        newItem.setAttachments(fileUrls);

        return ResponseEntity.ok(itemRepository.save(newItem));
    }

    // 2. MEVCUT İŞ EMRİNİ DÜZENLEME (Edit & S3 Deletion Handled)
    @PutMapping("/api/items/{itemId}")
    public ResponseEntity<ApartmentItem> updateItem(
            @PathVariable Long itemId,
            @RequestParam("title") String title,
            @RequestParam("price") String price,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "date", required = false) String date,
            @RequestParam(value = "notes", required = false) String notes,
            @RequestParam(value = "status", defaultValue = "Todo") String status,
            @RequestParam(value = "retainedAttachments", required = false) List<String> retainedAttachments, // <-- YENI: Kalan dosyalar
            @RequestParam(value = "attachments", required = false) List<MultipartFile> files) {

        ApartmentItem item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        String communityName = item.getApartment().getCommunity().getName();
        String apartmentId = item.getApartment().getId();

        item.setTitle(title);
        item.setPrice(price);
        item.setCategory(category);
        item.setDate(date);
        item.setNotes(notes);
        item.setStatus(status);

        // --- S3 FILE DELETION LOGIC ---
        List<String> currentAttachments = item.getAttachments() != null ? item.getAttachments() : new ArrayList<>();
        List<String> keptAttachments = retainedAttachments != null ? retainedAttachments : new ArrayList<>();

        // Eğer mevcut dosya "keptAttachments" listesinde yoksa, kullanıcı onu UI'da silmiş demektir. S3'ten uçur!
        for (String oldUrl : currentAttachments) {
            if (!keptAttachments.contains(oldUrl)) {
                if (oldUrl.contains("key=")) {
                    // Güvenli proxy linkinden S3 Key'ini çekiyoruz (/api/files/preview?key=VICTORY/...)
                    String key = oldUrl.substring(oldUrl.indexOf("key=") + 4);
                    s3StorageService.deleteFileByKey(key);
                }
            }
        }

        // --- ADD NEW UPLOADS ---
        List<String> finalFileUrls = new ArrayList<>(keptAttachments);
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                try {
                    String s3Key = s3StorageService.uploadApartmentDocument(communityName, apartmentId, "doc", file);
                    finalFileUrls.add("/api/files/preview?key=" + s3Key);
                } catch (IOException e) {
                    System.err.println("S3 Upload Hatası: " + file.getOriginalFilename());
                }
            }
        }

        item.setAttachments(finalFileUrls); // Güncel listeyi (kalanlar + yeniler) DB'ye kaydet

        return ResponseEntity.ok(itemRepository.save(item));
    }
    // 3. "DURUM GÜNCELLENEMEDİ" HATASINI ÇÖZEN ENDPOINT (Todo -> In Progress -> Complete)
    @PutMapping("/api/items/{itemId}/status")
    public ResponseEntity<ApartmentItem> updateItemStatus(
            @PathVariable Long itemId,
            @RequestParam("status") String status) {

        ApartmentItem item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        item.setStatus(status);
        return ResponseEntity.ok(itemRepository.save(item));
    }
}