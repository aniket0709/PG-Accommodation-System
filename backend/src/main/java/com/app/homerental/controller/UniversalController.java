package com.app.homerental.controller;

import com.app.homerental.converter.UserConverter;
import com.app.homerental.converter.UserPostConverter;
import com.app.homerental.model.imageModel.ImageDto;
import com.app.homerental.model.listingModel.ListingDto;
import com.app.homerental.model.listingModel.ListingParameters;
import com.app.homerental.model.userModel.User;
import com.app.homerental.model.userModel.UserDetailsImpl;
import com.app.homerental.model.userModel.UserPostDto;
import com.app.homerental.payload.request.LoginRequest;
import com.app.homerental.payload.response.JwtResponse;
import com.app.homerental.service.ImageService;
import com.app.homerental.service.ListingService;
import com.app.homerental.service.UserService;
import com.app.homerental.util.Helpers;
import com.app.homerental.util.JwtUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class UniversalController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;
    @Autowired
    ListingService listingService;
    @Autowired
    ImageService imageService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(),
                userDetails.getUsername(), userDetails.getEmail(), roles,
                userDetails.getFirstName(), userDetails.getLastName(),userDetails.getNumber(), userDetails.getApproved()));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        return ResponseEntity.ok().body("{}");
    }

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody UserPostDto userPostDto) throws JsonProcessingException {
        if(userService.findByUsername(userPostDto.getUsername()).isPresent())
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("{}");

        if(userPostDto.getRoles().stream().findFirst().get().getId().equals(2))
            userPostDto.setApproved(false);
        else
            userPostDto.setApproved(null);

        String password=userPostDto.getPassword();
        String encodedPassword=passwordEncoder.encode(password);
        userPostDto.setPassword(encodedPassword);

        return ResponseEntity.ok().body(Helpers.convertToJson(userService.save(userPostDto)));
    }

    @PutMapping("/listings")
    public ResponseEntity<List<ListingDto>> returnWithParameters(@RequestBody ListingParameters listingParameters){
        return ResponseEntity.ok().body(listingService.findWithParameters(listingParameters));
    }

    @GetMapping("/listings/{id}")
    public ResponseEntity<String> returnListingById(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok().body(Helpers.convertToJson(listingService.findDtoById(id)));
    }

    @GetMapping("/profile")
    public ResponseEntity<String> returnProfile(Principal principal) throws JsonProcessingException {

        if(principal!=null) {
            User user = userService.findByUsername(principal.getName()).get();
            return ResponseEntity.ok().body(Helpers.convertToJson(UserConverter.convertToDto(user)));
        }
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"Status\": \"Not a user\"}");
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestBody UserPostDto userPostDto, Principal principal) throws JsonProcessingException {

        System.out.println(userPostDto.getPassword());

        if(principal!=null) {
            User user = userService.findByUsername(principal.getName()).get();

            if(userPostDto.getPassword()!=null){
                user.setPassword(passwordEncoder.encode(userPostDto.getPassword()));
            }
            if(userPostDto.getFirstName()!=null){
                user.setFirstName(userPostDto.getFirstName());
            }
            if(userPostDto.getLastName()!=null){
                user.setLastName(userPostDto.getLastName());
            }
            if(userPostDto.getEmail()!=null){
                user.setEmail(userPostDto.getEmail());
            }
            if(userPostDto.getNumber()!=null){
                user.setNumber(userPostDto.getNumber());
            }

            userService.save(UserPostConverter.convertToDto(user));
            return ResponseEntity.ok().body(Helpers.convertToJson(UserConverter.convertToDto(user)));
        }
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"Status\": \"Not a user\"}");
    }

    @PostMapping("images/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        ImageDto img = new ImageDto(file.getOriginalFilename(), file.getContentType(), file.getBytes());
        img = imageService.uploadImage(img);
        return ResponseEntity.ok().body(Helpers.convertToJson(img));
    }

//    // send email notification
//    public void sendNotification(User user, String subject, String content) {
//        final String username = "himanshumuj@gmail.com";
//        final String password = "ktzyrdrmizogtjgx";
//
//        Properties prop = new Properties();
//        prop.put("mail.smtp.host", "smtp.gmail.com");
//        prop.put("mail.smtp.port", "587");
//        prop.put("mail.smtp.auth", "true");
//        prop.put("mail.smtp.starttls.enable", "true");
//
//        Session session = Session.getInstance(prop, new javax.mail.Authenticator() {
//            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication(username, password);
//            }
//        });
//
//        try {
//
//            Message message = new MimeMessage(session);
//            message.setFrom(new InternetAddress(username));
//            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(user.getEmail()));
//            message.setSubject(subject);
//
//            message.setContent("<p>Hi " + user.getFirstName() + " " + user.getLastName() + "!<br/><br/>" + content
//                    + "<p><br/><br/>Regards,<br/>Homerental Team.", "text/html");
//
//            Transport.send(message);
//
//            System.out.println("Email sending done");
//
//        } catch (AddressException e) {
//            e.printStackTrace();
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
//    }
}