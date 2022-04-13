package com.app.homerental.controller;

import com.app.homerental.model.bookingModel.Booking;
import com.app.homerental.model.bookingModel.BookingDto;
import com.app.homerental.model.bookingModel.BookingPost;
import com.app.homerental.model.listingModel.ListingDto;
import com.app.homerental.model.listingModel.ListingParameters;
import com.app.homerental.model.messageModel.MessageDto;
import com.app.homerental.model.reviewModel.ReviewDto;
import com.app.homerental.model.userModel.User;
import com.app.homerental.service.*;
import com.app.homerental.util.Helpers;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/guest")
@PreAuthorize("hasRole('GUEST') or hasRole('ADMIN')")
public class GuestController {

    @Autowired
    private UserService userService;
    @Autowired
    ListingService listingService;
    @Autowired
    ReviewService reviewService;
    @Autowired
    MessageService messageService;
    @Autowired
    BookingService bookingService;
    @Autowired
    UniversalController universalController;

    @PutMapping("/listings")
    public ResponseEntity<List<ListingDto>> returnWithParameters(@RequestBody ListingParameters listingParameters, Principal principal){
        User user = userService.findByUsername(principal.getName()).get();
        return ResponseEntity.ok().body(listingService.findWithParameters(listingParameters));
    }

    @GetMapping("/listings/{id}")
    public ResponseEntity<String> returnListingById(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok().body(Helpers.convertToJson(listingService.findDtoById(id)));
    }

    // Reviews
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewDto>> returnReviews(Principal principal){
        User user = userService.findByUsername(principal.getName()).get();
        return ResponseEntity.ok().body(reviewService.findByGuest(user.getId()));
    }

    @PostMapping("/reviews")
    public ResponseEntity<String> createReview(@RequestBody ReviewDto reviewDto) throws JsonProcessingException {
        return ResponseEntity.ok().body(Helpers.convertToJson(reviewService.save(reviewDto)));
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<String> updateReview(@PathVariable("id") Long id, @RequestBody @com.sun.istack.Nullable ReviewDto reviewDto) throws JsonProcessingException {
        if(reviewDto!=null)
            return ResponseEntity.ok().body(Helpers.convertToJson(reviewService.save(reviewDto)));
        else
            return ResponseEntity.badRequest().body("{\"Status\": \"Review not found\"}");
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<String> deleteReviewById(@PathVariable("id") Long id){
        reviewService.deleteById(id);
        return ResponseEntity.ok().body("{\"Status\": \"Successful Deletion\"}");
    }

    // Messages
    @GetMapping("/messages")
    public ResponseEntity<List<MessageDto>> returnMessages(Principal principal){
        User user = userService.findByUsername(principal.getName()).get();
        return ResponseEntity.ok().body(messageService.findByGuest(user.getId()));
    }

    @PostMapping("/messages")
    public ResponseEntity<String> createMessage(@RequestBody MessageDto messageDto) throws JsonProcessingException {
        messageDto.setSeen(false);
        return ResponseEntity.ok().body(Helpers.convertToJson(messageService.save(messageDto)));
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<String> deleteMessageById(@PathVariable("id") Long id){
        messageService.deleteById(id);
        return ResponseEntity.ok().body("{\"Status\": \"Successful Deletion\"}");
    }
    @PutMapping("/messages/{id}/seen")
    public ResponseEntity<String> seenMessageWithId(@PathVariable("id") Long id) throws JsonProcessingException {
        return ResponseEntity.ok().body(Helpers.convertToJson(messageService.seen(id)));
    }

    // Bookings
    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDto>> returnMyActiveBookings(Principal principal){
        User user = userService.findByUsername(principal.getName()).get();
        return ResponseEntity.ok().body(bookingService.returnMyBookings(user.getId()));
    }

    @PostMapping("/bookings")
    public ResponseEntity<String> createBooking(@RequestBody BookingPost bookingPost, Principal principal) throws JsonProcessingException {
        User user = userService.findByUsername(principal.getName()).get();
        bookingPost.setUserId(user.getId());

//        User guest = userService.findById(bookingPost.getUserId());
//        String subject = "Booking added!";
//        String content = "You just made a booking!";
//        universalController.sendNotification(guest, subject, content);

        return ResponseEntity.ok().body(Helpers.convertToJson(bookingService.newBooking(bookingPost)));
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<String> deleteBookingById(@PathVariable("id") Long id){
        bookingService.deleteById(id);
        return ResponseEntity.ok().body("{\"Status\": \"Successful Deletion\"}");
    }
}