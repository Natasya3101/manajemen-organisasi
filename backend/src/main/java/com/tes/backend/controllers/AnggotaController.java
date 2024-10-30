package com.tes.backend.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.tes.backend.dto.AnggotaRequest;
import com.tes.backend.dto.AnggotaResponse;

import com.tes.backend.services.anggota.AnggotaService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
// import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
// import io.swagger.v3.oas.models.media.MediaType;

@RequestMapping("/api/anggota")
@RestController
@Tag(name = "anggota")
@CrossOrigin(origins = "http://localhost:5173/")
public class AnggotaController {
    
    @Autowired 
    private AnggotaService anggotaService;

    @GetMapping("/get-all")
    @SecurityRequirement(name = "Bearer Authentication")
    public List<AnggotaResponse> getAll(){
        return anggotaService.getAll();
    }

    
    @PostMapping(value = "/add-anggota", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<Object> addAnggota(AnggotaRequest request,
    @RequestParam("anggota Image") MultipartFile file) {
        try {
            anggotaService.add(request, file);
            return ResponseEntity.ok("Success Add New Anggota");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body("Error: " + e.getReason());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error!");
        }
    }


}




