package com.example.restapi.controller;

import com.example.restapi.model.dto.CardDTO;
import com.example.restapi.model.dto.FileDTO;
import com.example.restapi.model.dto.RestResponseDTO;
import com.example.restapi.model.entity.Card;
import com.example.restapi.model.mapper.CardMapper;
import com.example.restapi.service.CardService;
import com.example.restapi.service.FileUploadService;
import com.example.restapi.util.ConstantUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/api/upload")
@Tag(name="API Upload")
public class UploadController {

    @Autowired
    private CardService cardService;

    @Autowired
    private CardMapper cardMapper;

    @Autowired
    private FileUploadService fileUploadService;

    @Operation(
            description = "Upload Cover of Card",
            summary = "This is upload cover of Card"
    )
    @PostMapping(value = "", consumes = {"multipart/form-data"})
    public ResponseEntity<RestResponseDTO<CardDTO>> uploadImage(@RequestParam("imageFile")MultipartFile fileImage,
                                                                @RequestParam("cardId") long cardId) {
        RestResponseDTO<CardDTO> restResponse = new RestResponseDTO<>();
        makeDirectoryIfNotExist();
        Card card = cardService.findById(cardId);
        if (card != null) {
            FileDTO fileDTO = fileUploadService.uploadFile(fileImage);
            card.setCover(fileDTO.getPath());
        }
        CardDTO cardDTO = cardMapper.toDTO(cardService.save(card));
        restResponse.ok(cardDTO);
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    private void makeDirectoryIfNotExist() {
        File directory = new File(ConstantUtil.PATH_FILE_UPLOAD);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }

}
