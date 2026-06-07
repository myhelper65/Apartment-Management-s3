package com.apartmentmanager.apartmentmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "apartment")
public class Apartment {

    @Id
    private String id; // Örn: "H3", "A2" (Frontend'den gelen manuel string ID)

    // Bir daire sadece bir siteye ait olabilir
    @ManyToOne
    @JoinColumn(name = "community_id")
    @JsonIgnore // JSON çıktısında sonsuz döngüyü engeller
    private Community community;

    // Bir dairenin birden fazla tamir/fatura kalemi olur
    @OneToMany(mappedBy = "apartment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("apartment")
    @OrderBy("id DESC") // Yeni eklenen tamirler en üstte görünsün diye
    private List<ApartmentItem> items = new ArrayList<>();
}

