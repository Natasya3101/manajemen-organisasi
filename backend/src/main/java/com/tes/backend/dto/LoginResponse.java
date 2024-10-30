package com.tes.backend.dto;


import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data

@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    String email;
    String token;
}
