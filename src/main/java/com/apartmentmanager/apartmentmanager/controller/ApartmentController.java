package com.apartmentmanager.apartmentmanager.controller;

import com.apartmentmanager.apartmentmanager.entity.Apartment;
import com.apartmentmanager.apartmentmanager.entity.ApartmentItem;
import com.apartmentmanager.apartmentmanager.repository.ApartmentItemRepository;
import com.apartmentmanager.apartmentmanager.repository.ApartmentRepository;
import com.apartmentmanager.apartmentmanager.service.S3StorageService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ApartmentController {

    private final ApartmentRepository apartmentRepository;
    private final ApartmentItemRepository itemRepository;
    private final S3StorageService s3StorageService; // YENİ: S3 Servisini dahil ettik

    @GetMapping("/apartments")
    public List<Apartment> getAllApartments() {
        return apartmentRepository.findAll();
    }

    @PostMapping("/apartments")
    public Apartment createApartment(@RequestBody Apartment apartment) {
        return apartmentRepository.save(apartment);
    }

    // DAİRE SİLME: Önce S3'teki Daire klasörünü temizler, sonra Veritabanından siler
    @DeleteMapping("/apartments/{id}")
    public void deleteApartment(@PathVariable String id) {
        apartmentRepository.findById(id).ifPresent(apartment -> {
            s3StorageService.deleteApartmentFiles(apartment.getCommunity().getName(), id);
            apartmentRepository.deleteById(id);
        });
    }

    // İŞ EMRİ SİLME: Sadece bu iş emrine ait dosyaları S3'ten bulur ve siler, sonra DB'yi temizler
    @DeleteMapping("/items/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepository.findById(id).ifPresent(item -> {
            if (item.getAttachments() != null) {
                for (String url : item.getAttachments()) {
                    if (url.contains("key=")) {
                        String key = url.substring(url.indexOf("key=") + 4);
                        s3StorageService.deleteFileByKey(key);
                    }
                }
            }
            itemRepository.deleteById(id);
        });
    }

    @GetMapping({"/favicon.ico", "favicon.ico"})
    @ResponseBody
    public void disableFavicon() {
        // Suppresses the 404 error
    }
}