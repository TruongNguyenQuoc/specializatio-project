package com.example.restapi.service;

import com.example.restapi.model.dto.FileDTO;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

    FileDTO uploadFile(MultipartFile multipartFile);

}
