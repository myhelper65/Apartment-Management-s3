package com.apartmentmanager.apartmentmanager.repository;

import com.apartmentmanager.apartmentmanager.entity.ApartmentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApartmentItemRepository extends JpaRepository<ApartmentItem, Long> {
}