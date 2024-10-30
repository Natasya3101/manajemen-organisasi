package com.tes.backend.models;

import java.sql.Blob;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Anggota {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "jabatan")
    private String jabatan;

    @Column(name = "atasan")
    private String atasan;
    
    @Lob
    @Column(name = "image")
    private Blob image;

    
   

   

    
}
