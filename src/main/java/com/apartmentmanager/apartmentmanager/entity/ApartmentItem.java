package com.apartmentmanager.apartmentmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "item")
public class ApartmentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String price;
    private String date;
    private String category; // Frontend'den gelen 'General Maintenance' vs.

    @Column(columnDefinition = "TEXT")
    private String notes;
    private String status;

    @Column(name = "product_image_url", columnDefinition = "TEXT")
    private String productImageUrl;

    @Column(name = "invoice_image_url", columnDefinition = "TEXT")
    private String invoiceImageUrl;

    // YENİ: AWS S3'ten dönen URL'leri sonsuza kadar saklayacak liste
    @ElementCollection
    @CollectionTable(name = "item_attachments", joinColumns = @JoinColumn(name = "item_id"))
    @Column(name = "url", columnDefinition = "TEXT")
    private List<String> attachments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "apartment_id")
    @JsonIgnore // JSON çıktısında sonsuz döngüyü engeller
    private Apartment apartment;
}