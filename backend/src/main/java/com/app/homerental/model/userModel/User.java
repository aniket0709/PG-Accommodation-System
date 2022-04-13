package com.app.homerental.model.userModel;

import com.app.homerental.model.bookingModel.Booking;
import com.app.homerental.model.imageModel.Image;
import com.app.homerental.model.listingModel.Listing;
import com.app.homerental.model.messageModel.Message;
import com.app.homerental.model.reviewModel.Review;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//@Data
//@AllArgsConstructor
//@NoArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private long id;

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String number;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Image profileImage;

    @CreationTimestamp
    private Date userSince;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    private Boolean approved;

    @OneToMany(mappedBy = "host" ,fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Listing> myListings;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Review> reviews;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "guest", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Message> messages;

    public User() {
    }
//
//	public Collection<? extends GrantedAuthority> getRoles() {
//		// TODO Auto-generated method stub
//		return null;
//	}

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

	public Image getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(Image profileImage) {
		this.profileImage = profileImage;
	}

	public Date getUserSince() {
		return userSince;
	}

	public void setUserSince(Date userSince) {
		this.userSince = userSince;
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

	public List<Listing> getMyListings() {
		return myListings;
	}

	public void setMyListings(List<Listing> myListings) {
		this.myListings = myListings;
	}

	public List<Review> getReviews() {
		return reviews;
	}

	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}

	public List<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	

}


