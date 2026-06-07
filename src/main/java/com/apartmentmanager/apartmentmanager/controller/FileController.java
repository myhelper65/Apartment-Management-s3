package com.apartmentmanager.apartmentmanager.controller;

import com.apartmentmanager.apartmentmanager.service.S3StorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class FileController {

    private final S3StorageService s3StorageService;

    public FileController(S3StorageService s3StorageService) {
        this.s3StorageService = s3StorageService;
    }

    @GetMapping("/api/files/preview")
    public ResponseEntity<Void> previewFile(@RequestParam("key") String key, @AuthenticationPrincipal OAuth2User user) {
        // GÜVENLİK DUVARI: Sadece Google ile giriş yapmış yetkili kullanıcılar görebilir!
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // S3'ten 15 dakikalık geçici link üret
        String temporaryUrl = s3StorageService.generatePresignedUrl(key);

        // Tarayıcıyı bu güvenli geçici linke yönlendir (Redirect 302)
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(temporaryUrl))
                .build();
    }
}