package com.app.homerental.controller;

import com.app.homerental.model.messageModel.MessageDto;
import com.app.homerental.util.Helpers;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/")
public class BasicController {

    @GetMapping("/")
    public String welcomeUser() {
        return "Welcome to HomeRental";
    }
}
