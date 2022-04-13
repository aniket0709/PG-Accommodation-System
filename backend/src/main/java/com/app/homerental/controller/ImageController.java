package com.app.homerental.controller;

import com.app.homerental.model.imageModel.Image;
import com.app.homerental.model.imageModel.ImageDto;
import com.app.homerental.service.ImageService;
import com.app.homerental.util.Helpers;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/images")
//@PreAuthorize("hasRole('GUEST') or hasRole('ADMIN') or hasRole('HOST')")
public class ImageController {

    @Autowired
    ImageService imageService;

    @GetMapping("/{imageName}")
    public ResponseEntity<String> getImage(@PathVariable("imageName") String imageName) throws Exception {
        ImageDto retrievedImage = imageService.findByName(imageName);
        return ResponseEntity.ok().body(Helpers.convertToJson(retrievedImage));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateImageInformation(@RequestBody ImageDto imageDto) throws JsonProcessingException {
        if(imageDto.getUserId() != null){
            Optional<Image> image = imageService.findByUserId(imageDto.getUserId());
            if(image.isPresent()) {
                imageService.deleteById(image.get().getId());
            }
        }

        imageDto = imageService.uploadImage(imageDto);
        return ResponseEntity.ok().body(Helpers.convertToJson(imageDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable("id") Long id){
        imageService.deleteById(id);

        return ResponseEntity.ok().body("{\"Status\": \"Successful Deletion\"}");
    }
}