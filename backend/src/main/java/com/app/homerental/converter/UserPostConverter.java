package com.app.homerental.converter;

import com.app.homerental.model.bookingModel.Booking;
import com.app.homerental.model.bookingModel.BookingDto;
import com.app.homerental.model.listingModel.Listing;
import com.app.homerental.model.listingModel.ListingDto;
import com.app.homerental.model.reviewModel.Review;
import com.app.homerental.model.reviewModel.ReviewDto;
import com.app.homerental.model.userModel.User;
import com.app.homerental.model.userModel.UserPostDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserPostConverter {

    public static UserPostDto convertToDto(User user){

        UserPostDto userPostDto = new UserPostDto();

        userPostDto.setId(user.getId());

        userPostDto.setUsername(user.getUsername());
        userPostDto.setPassword(user.getPassword());
        userPostDto.setFirstName(user.getFirstName());
        userPostDto.setLastName(user.getLastName());
        userPostDto.setEmail(user.getEmail());
        userPostDto.setRoles(user.getRoles());
        userPostDto.setApproved(user.getApproved());
        userPostDto.setNumber(user.getNumber());
        userPostDto.setUserSince(user.getUserSince());

        if(user.getProfileImage()!=null)
            userPostDto.setImage(ImageConverter.convertToDto(user.getProfileImage()));

        List<ListingDto> myListingDtoList = user.getMyListings().stream().map(ListingConverter::convertToDto).collect(Collectors.toList());
        userPostDto.setMyListings(myListingDtoList);

        List<ReviewDto> myReviewDtoList = user.getReviews().stream().map(ReviewConverter::convertToDto).collect(Collectors.toList());
        userPostDto.setReviews(myReviewDtoList);

        List<BookingDto> myBookingDtoList = user.getBookings().stream().map(BookingConverter::convertToDto).collect(Collectors.toList());
        userPostDto.setBookings(myBookingDtoList);

        return userPostDto;
    }

    public static User convert(UserPostDto userPostDto){

        User user = new User();

        user.setId(userPostDto.getId());

        user.setUsername(userPostDto.getUsername());
        user.setPassword(userPostDto.getPassword());
        user.setFirstName(userPostDto.getFirstName());
        user.setLastName(userPostDto.getLastName());
        user.setEmail(userPostDto.getEmail());
        user.setRoles(userPostDto.getRoles());
        user.setApproved(userPostDto.getApproved());
        user.setNumber(userPostDto.getNumber());
        user.setUserSince(userPostDto.getUserSince());

        if(userPostDto.getImage()!=null)
            user.setProfileImage(ImageConverter.convert(userPostDto.getImage()));

        if(userPostDto.getMyListings()==null)
            user.setMyListings(new ArrayList<Listing>());
        else{
            List<Listing> myListingList = userPostDto.getMyListings().stream().map(ListingConverter::convert).collect(Collectors.toList());
            user.setMyListings(myListingList);
        }

        if(userPostDto.getReviews()==null)
            user.setReviews(new ArrayList<Review>());
        else{
            List<Review> myReviewList = userPostDto.getReviews().stream().map(ReviewConverter::convert).collect(Collectors.toList());
            user.setReviews(myReviewList);
        }

        if(userPostDto.getBookings()==null)
            user.setBookings(new ArrayList<Booking>());
        else {
            List<Booking> myBookingList = userPostDto.getBookings().stream().map(BookingConverter::convert).collect(Collectors.toList());
            user.setBookings(myBookingList);
        }

        return user;
    }
}
