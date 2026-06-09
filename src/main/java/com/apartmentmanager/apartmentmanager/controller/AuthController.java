package com.apartmentmanager.apartmentmanager.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public Map<String, Object> getCurrentUser(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();

        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User user = (OAuth2User) authentication.getPrincipal();
            response.put("isAuthenticated", true);
            // Sadece gerekli ve güvenli verileri UI'a gönderiyoruz
            response.put("name", user.getAttribute("name"));
            response.put("email", user.getAttribute("email"));
        } else {
            response.put("isAuthenticated", false);
        }

        return response;
    }
}