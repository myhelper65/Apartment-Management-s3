package com.apartmentmanager.apartmentmanager.controller;

import com.apartmentmanager.apartmentmanager.service.S3StorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@CrossOrigin(origins = "*") // React ve Java farklı portlarda olduğu için CORS kalkanını indiriyoruz
public class FileController {

    private final S3StorageService s3StorageService;

    public FileController(S3StorageService s3StorageService) {
        this.s3StorageService = s3StorageService;
    }

    @GetMapping("/api/files/preview")
    public ResponseEntity<Void> previewFile(@RequestParam("key") String key) {
        
        // S3'ten 15 dakikalık geçici ve güvenli link üret
        String temporaryUrl = s3StorageService.generatePresignedUrl(key);

        // Tarayıcıyı AWS S3'ün orijinal ve güvenli linkine yönlendir (Redirect 302)
        // Bu sayede PDF, PNG, MP4 ne olursa olsun tarayıcı kendi formatında açar!
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(temporaryUrl))
                .build();
    }
}