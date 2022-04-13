package com.app.homerental.service;

import com.app.homerental.converter.ImageConverter;
import com.app.homerental.converter.UserPostConverter;
import com.app.homerental.model.superModel.ReturnEverything;
import com.app.homerental.repository.ImageRepository;
import com.app.homerental.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class SuperServiceImpl implements SuperService {
    @Autowired
    BookingService bookingService;
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    ListingService listingService;
    @Autowired
    MessageService messageService;
    @Autowired
    ReviewService reviewService;
    @Autowired
    UserRepository userRepository;


    @Override
    public ReturnEverything returnEverything() {
        ReturnEverything returnEverything = new ReturnEverything();

        returnEverything.setUsersList(userRepository.findAll()
                .stream()
                .map(UserPostConverter::convertToDto)
                .collect(Collectors.toList()));

        returnEverything.setListingsList(listingService.findAll());
        returnEverything.setBookingsList(bookingService.findAll());
        returnEverything.setReviewsList(reviewService.findAll());
        returnEverything.setMessagesList(messageService.findAll());
        returnEverything.setImagesList(imageRepository.findAll().stream()
                .map(ImageConverter::convertToDto)
                .collect(Collectors.toList()));

        return returnEverything;
    }
}
