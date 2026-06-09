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

    @DeleteMapping("/items/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepository.findById(id).ifPresent(item -> {
            String commName = item.getApartment().getCommunity().getName();
            String aptId = item.getApartment().getId();

            // Eğer String Work Order ID varsa o klasörü S3'ten sil!
            if (item.getWorkOrderId() != null) {
                s3StorageService.deleteWorkOrderFiles(commName, aptId, item.getWorkOrderId());
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