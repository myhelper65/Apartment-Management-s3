package com.apartmentmanager.apartmentmanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // 1. Statik dosyalar ve UI giriş noktası (React'in index.html'i için)
                        .requestMatchers("/", "/index.html", "/static/**", "/*.js", "/*.css").permitAll()

                        // 2. Actuator (Sadece sağlık ve metrikler için)
                        .requestMatchers("/actuator/health", "/actuator/prometheus", "/actuator/metrics").permitAll()

                        // 3. API uç noktaları (Burayı daha sonra 'hasRole' ile kısıtlayabilirsiniz)
                        // Not: /api/auth/me adresi de bu sayede otomatik olarak izne tabi olmayacak.
                        .requestMatchers("/api/**").permitAll()

                        // 4. Diğer her şey için giriş yapma zorunluluğu
                        .anyRequest().authenticated()
                )
                // 5. OAUTH2 GOOGLE GİRİŞ AYARLARI EKLENDİ
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("/", true) // Giriş başarılı olunca React ana sayfasına dön
                )
                // 6. ÇIKIŞ YAPMA (LOGOUT) AYARLARI EKLENDİ
                .logout(logout -> logout
                        .logoutSuccessUrl("/") // Çıkış yapınca ana sayfaya dön
                        .permitAll()
                );

        return http.build();
    }
}