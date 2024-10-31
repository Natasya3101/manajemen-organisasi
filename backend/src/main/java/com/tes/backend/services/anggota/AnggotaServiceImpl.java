package com.tes.backend.services.anggota;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.http.HttpStatus;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.beans.factory.annotation.Autowired;

import com.tes.backend.dto.AnggotaRequest;
import com.tes.backend.dto.AnggotaResponse;
import com.tes.backend.models.Anggota;
import com.tes.backend.repositorys.AnggotaRepository;
import com.tes.backend.services.image.ImageService;

import java.util.stream.Collectors;

@Service
public class AnggotaServiceImpl implements AnggotaService{
    @Autowired
    private AnggotaRepository anggotaRepository;
    @Autowired
    private ImageService imageService;

    @Override
    public List<AnggotaResponse> getAll() {
        return anggotaRepository.findAll().stream().map(anggota -> {
            String imageBase64 = null;
            try {
                if (anggota.getImage() != null) {
                    imageBase64 = imageService.convertImage(anggota.getImage());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            return AnggotaResponse.builder()
                    .id(anggota.getId())
                    .name(anggota.getName())
                    .jabatan(anggota.getJabatan())
                    .atasan(anggota.getAtasan())
                    .image(imageBase64)
                    .build();
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AnggotaRequest add(AnggotaRequest request, MultipartFile anggotaImage) {
        try {
            if (!anggotaImage.getContentType().startsWith("image")) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported File Type");
            }
            Anggota anggota = anggotaRepository.findByName(request.getName()).orElse(null);
    
            if (anggota != null) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Data gagal ditambahkan: data sudah ada");
            }
            Anggota newAnggota = new Anggota();
            newAnggota.setName(request.getName());
            newAnggota.setJabatan(request.getJabatan());
            newAnggota.setAtasan(request.getAtasan());
            newAnggota.setImage(new SerialBlob(anggotaImage.getBytes()));
            anggotaRepository.save(newAnggota);
            return request;
        } catch (IOException | SQLException e) {
            
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Terjadi kesalahan saat menambahkan data", e);
        }
    }
}
    

    
    

