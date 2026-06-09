package com.apartmentmanager.apartmentmanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // CORS: React (5175) ve Java (8080) arası haberleşme
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // CSRF: API tabanlı uygulama olduğu için disable ettik
                .csrf(csrf -> csrf.disable())
                // Clickjacking koruması
                .headers(headers -> headers.frameOptions(frame -> frame.deny()))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/index.html", "/static/**", "/*.js", "/*.css", "/oauth2/**", "/login/**").permitAll()
                        .requestMatchers("/api/auth/me").permitAll()
                        .requestMatchers("/api/**").permitAll() // Test süreci için açık
                        .anyRequest().authenticated()
                )

                .oauth2Login(oauth2 -> oauth2
                        // Rotayı sabitleyen ayarı da koruyoruz
                        .authorizationEndpoint(auth -> auth
                                .baseUri("/oauth2/authorization")
                        )
                        .defaultSuccessUrl("http://localhost:5175/", true) // Başarılı giriş -> React
                )

                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/api/logout", "GET"))
                        .logoutSuccessUrl("http://localhost:5175/")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID")
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Hatanın çözümü: setAllowedOrigins yerine setAllowedOriginPatterns kullanıyoruz!
        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:5175", "http://localhost:5174"));

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true); // Çerezlere izin verdik

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}