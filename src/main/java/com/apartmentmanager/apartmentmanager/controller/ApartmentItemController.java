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

    // 3. DURUM GÜNCELLEME
    @PutMapping("/api/items/{itemId}/status")
    public ResponseEntity<ApartmentItem> updateItemStatus(
            @PathVariable Long itemId,
            @RequestParam("status") String status) {

        ApartmentItem item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        item.setStatus(status);
        return ResponseEntity.ok(itemRepository.save(item));
    }

    // 1. YENİ İŞ EMRİ EKLEME
    @PostMapping("/api/apartments/{apartmentId}/items")
    public ResponseEntity<ApartmentItem> createItem(
            @PathVariable String apartmentId,
            @RequestParam(value = "workOrderId", required = true) String workOrderId, // EKLENDİ
            @RequestParam("title") String title,
            @RequestParam("price") String price,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "date", required = false) String date,
            @RequestParam(value = "notes", required = false) String notes,
            @RequestParam(value = "status", defaultValue = "Todo") String status,
            @RequestParam(value = "priority", required = false) String priority,
            @RequestParam(value = "vendor", required = false) String vendor,
            @RequestParam(value = "isOutsourced", defaultValue = "false") Boolean isOutsourced,
            @RequestParam(value = "entryPermission", defaultValue = "false") Boolean entryPermission,
            @RequestParam(value = "materialCost", required = false) String materialCost,
            @RequestParam(value = "laborCost", required = false) String laborCost,
            @RequestParam(value = "attachments", required = false) List<MultipartFile> files) {

        Apartment apartment = apartmentRepository.findById(apartmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Apartment not found"));
        String communityName = apartment.getCommunity().getName();

        ApartmentItem newItem = new ApartmentItem();
        newItem.setWorkOrderId(workOrderId); // DB'ye kaydetmek için EKLENDİ
        newItem.setTitle(title);
        newItem.setPrice(price);
        newItem.setCategory(category);
        newItem.setDate(date);
        newItem.setNotes(notes);
        newItem.setStatus(status);
        newItem.setPriority(priority);
        newItem.setVendor(vendor);
        newItem.setIsOutsourced(isOutsourced);
        newItem.setEntryPermission(entryPermission);
        newItem.setMaterialCost(materialCost);
        newItem.setLaborCost(laborCost);
        newItem.setApartment(apartment);

        // Artık S3'te klasör açmak için DB'den dönen ID'yi beklememize gerek kalmadı!
        // Doğrudan Frontend'den gelen "workOrderId" kullanıyoruz.

        List<String> fileUrls = new ArrayList<>();
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                try {
                    // GÜNCELLENDİ: newItem.getId() yerine arayüzden gelen workOrderId verildi
                    String s3Key = s3StorageService.uploadWorkOrderDocument(communityName, apartmentId, workOrderId, "doc", file);
                    fileUrls.add("/api/files/preview?key=" + s3Key);
                } catch (IOException e) {
                    System.err.println("S3 Upload Hatası");
                }
            }
        }

        newItem.setAttachments(fileUrls);

        // İşlemler bittikten sonra tek seferde veritabanına kaydediyoruz
        return ResponseEntity.ok(itemRepository.save(newItem));
    }

    // 2. MEVCUT İŞ EMRİNİ DÜZENLEME
    @PutMapping("/api/items/{itemId}")
    public ResponseEntity<ApartmentItem> updateItem(
            @PathVariable Long itemId, // DÜZELTİLDİ: String yerine Long olmalı
            @RequestParam(value = "workOrderId", required = true) String workOrderId, // EKLENDİ
            @RequestParam("title") String title,
            @RequestParam("price") String price,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "date", required = false) String date,
            @RequestParam(value = "notes", required = false) String notes,
            @RequestParam(value = "status", defaultValue = "Todo") String status,
            @RequestParam(value = "priority", required = false) String priority,
            @RequestParam(value = "vendor", required = false) String vendor,
            @RequestParam(value = "isOutsourced", defaultValue = "false") Boolean isOutsourced,
            @RequestParam(value = "entryPermission", defaultValue = "false") Boolean entryPermission,
            @RequestParam(value = "materialCost", required = false) String materialCost,
            @RequestParam(value = "laborCost", required = false) String laborCost,
            @RequestParam(value = "retainedAttachments", required = false) List<String> retainedAttachments,
            @RequestParam(value = "attachments", required = false) List<MultipartFile> files) {

        ApartmentItem item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        String communityName = item.getApartment().getCommunity().getName();
        String apartmentId = item.getApartment().getId();

        // Alanları güncelle
        item.setWorkOrderId(workOrderId); // EKLENDİ
        item.setTitle(title);
        item.setPrice(price);
        item.setCategory(category);
        item.setDate(date);
        item.setNotes(notes);
        item.setStatus(status);
        item.setPriority(priority);
        item.setVendor(vendor);
        item.setIsOutsourced(isOutsourced);
        item.setEntryPermission(entryPermission);
        item.setMaterialCost(materialCost);
        item.setLaborCost(laborCost);

        List<String> currentAttachments = item.getAttachments() != null ? item.getAttachments() : new ArrayList<>();
        List<String> keptAttachments = retainedAttachments != null ? retainedAttachments : new ArrayList<>();

        for (String oldUrl : currentAttachments) {
            if (!keptAttachments.contains(oldUrl) && oldUrl.contains("key=")) {
                String key = oldUrl.substring(oldUrl.indexOf("key=") + 4);
                s3StorageService.deleteFileByKey(key);
            }
        }

        List<String> finalFileUrls = new ArrayList<>(keptAttachments);
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                try {
                    // GÜNCELLENDİ: itemId (Long) yerine artık arayüzden gelen workOrderId kullanılıyor!
                    String s3Key = s3StorageService.uploadWorkOrderDocument(communityName, apartmentId, workOrderId, "doc", file);
                    finalFileUrls.add("/api/files/preview?key=" + s3Key);
                } catch (IOException e) {
                    System.err.println("S3 Upload Hatası");
                }
            }
        }
        item.setAttachments(finalFileUrls);
        return ResponseEntity.ok(itemRepository.save(item));
    }
}