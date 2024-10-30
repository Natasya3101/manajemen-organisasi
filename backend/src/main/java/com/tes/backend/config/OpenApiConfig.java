package com.tes.backend.config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI myOpenAPI() {
        
        // Define the server URL
        Server localServer = new Server()
            .url("http://localhost:8080")
            .description("Server URL in local environment");

        // Define contact information
        Contact contact = new Contact()
            .email("info@gmail.com")
            .name("Info")
            .url("http://www.test.com");

        // Define license information
        License mitLicense = new License()
            .name("MIT License")
            .url("http://mit-test.com");

        // Define API information
        Info info = new Info()
            .title("Anggota Organisasi")
            .version("1.0")
            .contact(contact)
            .description("This API is used for a sample Java project")
            .termsOfService("http://www.test.com/term")
            .license(mitLicense);

        // Define security scheme
        SecurityScheme securityScheme = new SecurityScheme()
            .type(SecurityScheme.Type.HTTP)
            .bearerFormat("JWT")
            .scheme("bearer");

        // Build and return the OpenAPI instance
        return new OpenAPI()
            .components(new Components().addSecuritySchemes("Bearer Authentication", securityScheme))
            .info(info)
            .servers(List.of(localServer));
    }
}
