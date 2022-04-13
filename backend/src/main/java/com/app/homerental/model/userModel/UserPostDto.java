package com.app.homerental.model.userModel;

import com.app.homerental.model.bookingModel.BookingDto;
import com.app.homerental.model.imageModel.ImageDto;
import com.app.homerental.model.listingModel.ListingDto;
import com.app.homerental.model.reviewModel.ReviewDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;


@NoArgsConstructor
public class UserPostDto {

    private long id;
    private String username;
    private String password;

    private Set<Role> roles;

    private Boolean approved;
    private String firstName;
    private String lastName;
    private String email;
    private String number;

    private Date userSince;

    private ImageDto image;
    private List<ListingDto> myListings;
    private List<ReviewDto> reviews;
    private List<BookingDto> bookings;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	public Boolean getApproved() {
		return approved;
	}
	public void setApproved(Boolean approved) {
		this.approved = approved;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public Date getUserSince() {
		return userSince;
	}
	public void setUserSince(Date userSince) {
		this.userSince = userSince;
	}
	public ImageDto getImage() {
		return image;
	}
	public void setImage(ImageDto image) {
		this.image = image;
	}
	public List<ListingDto> getMyListings() {
		return myListings;
	}
	public void setMyListings(List<ListingDto> myListings) {
		this.myListings = myListings;
	}
	public List<ReviewDto> getReviews() {
		return reviews;
	}
	public void setReviews(List<ReviewDto> reviews) {
		this.reviews = reviews;
	}
	public List<BookingDto> getBookings() {
		return bookings;
	}
	public void setBookings(List<BookingDto> bookings) {
		this.bookings = bookings;
	}
    
    

}
