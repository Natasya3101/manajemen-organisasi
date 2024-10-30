package com.tes.backend.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tes.backend.models.Anggota;

public interface AnggotaRepository extends JpaRepository<Anggota, Integer> {
    Optional<Anggota> findByName(String name);
    Anggota findProductsById(Integer id);
   
} 
