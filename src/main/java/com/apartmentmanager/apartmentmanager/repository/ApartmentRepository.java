package com.apartmentmanager.apartmentmanager.repository;

import com.apartmentmanager.apartmentmanager.entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApartmentRepository extends JpaRepository<Apartment, String> {
}