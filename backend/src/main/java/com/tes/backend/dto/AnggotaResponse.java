package com.tes.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnggotaResponse {
    private Integer id;
    private String name;
    private String jabatan;
    private String atasan;
    private String image;


}
