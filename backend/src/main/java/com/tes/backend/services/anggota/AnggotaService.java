package com.tes.backend.services.anggota;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.tes.backend.dto.AnggotaRequest;
import com.tes.backend.dto.AnggotaResponse;


public interface AnggotaService {
    List<AnggotaResponse> getAll();
    void add(AnggotaRequest request,MultipartFile anggotaImage) throws IOException, SQLException;

} 
