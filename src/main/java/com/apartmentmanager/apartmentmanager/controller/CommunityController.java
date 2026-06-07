package com.apartmentmanager.apartmentmanager.controller;

import com.apartmentmanager.apartmentmanager.entity.Community;
import com.apartmentmanager.apartmentmanager.entity.Apartment;
import com.apartmentmanager.apartmentmanager.repository.CommunityRepository;
import com.apartmentmanager.apartmentmanager.service.S3StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/communities")
@CrossOrigin(origins = "*")
public class CommunityController {

    @Autowired
    private CommunityRepository communityRepository;
    
    @Autowired
    private S3StorageService s3StorageService; // YENİ: S3 Servisi

    @GetMapping
    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }

    @PostMapping
    public Community createCommunity(@RequestBody Community community) {
        return communityRepository.save(community);
    }

    @PostMapping("/{communityId}/apartments")
    public ResponseEntity<Apartment> addApartmentToCommunity(
            @PathVariable Long communityId, 
            @RequestBody Apartment apartment) {
        
        return communityRepository.findById(communityId).map(community -> {
            apartment.setCommunity(community);
            community.getApartments().add(apartment);
            communityRepository.save(community);
            return ResponseEntity.ok(apartment);
        }).orElse(ResponseEntity.notFound().build());
    }

    // SİTE SİLME: Önce AWS S3'teki o siteye ait DEV klasörü komple siler, sonra DB'den uçar!
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCommunity(@PathVariable Long id) {
        communityRepository.findById(id).ifPresent(community -> {
            s3StorageService.deleteCommunityFiles(community.getName());
            communityRepository.deleteById(id); // Cascade özelliği sayesinde Daireler ve İş Emirleri de silinir
        });
        return ResponseEntity.ok().build();
    }
}