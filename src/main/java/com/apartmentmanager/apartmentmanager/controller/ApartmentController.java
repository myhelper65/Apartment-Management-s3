package com.apartmentmanager.apartmentmanager.controller;

import com.apartmentmanager.apartmentmanager.entity.Apartment;
import com.apartmentmanager.apartmentmanager.entity.ApartmentItem;
import com.apartmentmanager.apartmentmanager.repository.ApartmentItemRepository;
import com.apartmentmanager.apartmentmanager.repository.ApartmentRepository;
import com.apartmentmanager.apartmentmanager.service.S3Service;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ApartmentController {

    private final ApartmentRepository apartmentRepository;
    private final ApartmentItemRepository itemRepository;
    private final S3Service s3Service;

    @GetMapping("/apartments")
    public List<Apartment> getAllApartments() {
        return apartmentRepository.findAll();
    }

    @PostMapping("/apartments")
    public Apartment createApartment(@RequestBody Apartment apartment) {
        return apartmentRepository.save(apartment);
    }

    @DeleteMapping("/apartments/{id}")
    public void deleteApartment(@PathVariable String id) {
        apartmentRepository.deleteById(id);
    }

    @PostMapping("/apartments/{apartmentId}/items")
    public ApartmentItem addItem(
            @PathVariable String apartmentId,
            @RequestParam String title,
            @RequestParam String price,
            @RequestParam String date,
            @RequestParam String notes,
            @RequestParam String status,

            @RequestParam(required = false)
            MultipartFile productImage,

            @RequestParam(required = false)
            MultipartFile invoiceImage

    ) throws IOException {

        Apartment apartment = apartmentRepository
                .findById(apartmentId)
                .orElseThrow();

        ApartmentItem item = new ApartmentItem();

        item.setTitle(title);
        item.setPrice(price);
        item.setDate(date);
        item.setNotes(notes);
        item.setStatus(status);

        if (productImage != null) {
            String productUrl = s3Service.uploadFile(productImage);
            item.setProductImageUrl(productUrl);
        }

        if (invoiceImage != null) {
            String invoiceUrl = s3Service.uploadFile(invoiceImage);
            item.setInvoiceImageUrl(invoiceUrl);
        }

        item.setApartment(apartment);

        return itemRepository.save(item);
    }

    @DeleteMapping("/items/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
    }
}