package com.apartmentmanager.apartmentmanager.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class AuthController {
    
    @GetMapping("/api/auth/me")
    public Map<String, Object> getCurrentUser(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return Map.of("isAuthenticated", false);
        }
        // Google'dan gelen bilgilerle kullanıcıyı dön
        return Map.of(
                "isAuthenticated", true,
                "name", user.getAttribute("name"),
                "email", user.getAttribute("email"),
                "picture", user.getAttribute("picture")
        );
    }
}