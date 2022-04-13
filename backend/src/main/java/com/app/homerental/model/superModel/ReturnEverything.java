package com.app.homerental.model.superModel;

import com.app.homerental.model.bookingModel.BookingDto;
import com.app.homerental.model.imageModel.ImageDto;
import com.app.homerental.model.listingModel.ListingDto;
import com.app.homerental.model.messageModel.MessageDto;
import com.app.homerental.model.reviewModel.ReviewDto;
import com.app.homerental.model.userModel.UserPostDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class ReturnEverything {
    List<UserPostDto> usersList;
    List<ListingDto> listingsList;
    List<BookingDto> bookingsList;
    List<ReviewDto> reviewsList;
    List<MessageDto> messagesList;
    List<ImageDto> imagesList;
	public List<UserPostDto> getUsersList() {
		return usersList;
	}
	public void setUsersList(List<UserPostDto> usersList) {
		this.usersList = usersList;
	}
	public List<ListingDto> getListingsList() {
		return listingsList;
	}
	public void setListingsList(List<ListingDto> listingsList) {
		this.listingsList = listingsList;
	}
	public List<BookingDto> getBookingsList() {
		return bookingsList;
	}
	public void setBookingsList(List<BookingDto> bookingsList) {
		this.bookingsList = bookingsList;
	}
	public List<ReviewDto> getReviewsList() {
		return reviewsList;
	}
	public void setReviewsList(List<ReviewDto> reviewsList) {
		this.reviewsList = reviewsList;
	}
	public List<MessageDto> getMessagesList() {
		return messagesList;
	}
	public void setMessagesList(List<MessageDto> messagesList) {
		this.messagesList = messagesList;
	}
	public List<ImageDto> getImagesList() {
		return imagesList;
	}
	public void setImagesList(List<ImageDto> imagesList) {
		this.imagesList = imagesList;
	}

}
