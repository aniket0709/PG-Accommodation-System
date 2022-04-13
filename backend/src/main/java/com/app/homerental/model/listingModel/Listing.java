package com.app.homerental.model.listingModel;

import com.app.homerental.model.bookingModel.Booking;
import com.app.homerental.model.imageModel.Image;
import com.app.homerental.model.messageModel.Message;
import com.app.homerental.model.reviewModel.Review;
import com.app.homerental.model.userModel.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "listing_id", nullable = false)
    private long id;

    private String title;

    @Enumerated(EnumType.STRING)
    private RoomType type;

    private int numOfBeds;
    private int numOfWashrooms;
    private int numOfRooms;

    @Column(length = 2048)
    private String description;

    private boolean smoking;
    private boolean animals;
    private boolean parties;

    private int maxGuests;

    private String state;
    private String city;
    private String neighborhood;
    private String address;
    private String postalCode;

    private double price;

    private double costPerExtraGuest;

    private boolean wifi;
    private boolean ac;
    private boolean heating;
    private boolean kitchen;
    private boolean tv;
    private boolean parking;
    private boolean elevator;

    private Date startDate;
    private Date endDate;

    private int numOfReviews;
    private double averageRating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="user_id", nullable = false)
    private User host;

    @OneToMany(mappedBy = "listing", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Review> reviews;

    @OneToMany(mappedBy = "listing", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "listing" ,fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Image> images;

    @OneToMany(mappedBy = "listing" ,fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Message> messages;

    public Listing() {
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public RoomType getType() {
		return type;
	}

	public void setType(RoomType type) {
		this.type = type;
	}

	public int getNumOfBeds() {
		return numOfBeds;
	}

	public void setNumOfBeds(int numOfBeds) {
		this.numOfBeds = numOfBeds;
	}

	public int getNumOfWashrooms() {
		return numOfWashrooms;
	}

	public void setNumOfWashrooms(int numOfWashrooms) {
		this.numOfWashrooms = numOfWashrooms;
	}

	public int getNumOfRooms() {
		return numOfRooms;
	}

	public void setNumOfRooms(int numOfRooms) {
		this.numOfRooms = numOfRooms;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isSmoking() {
		return smoking;
	}

	public void setSmoking(boolean smoking) {
		this.smoking = smoking;
	}

	public boolean isAnimals() {
		return animals;
	}

	public void setAnimals(boolean animals) {
		this.animals = animals;
	}

	public boolean isParties() {
		return parties;
	}

	public void setParties(boolean parties) {
		this.parties = parties;
	}

	public int getMaxGuests() {
		return maxGuests;
	}

	public void setMaxGuests(int maxGuests) {
		this.maxGuests = maxGuests;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getCostPerExtraGuest() {
		return costPerExtraGuest;
	}

	public void setCostPerExtraGuest(double costPerExtraGuest) {
		this.costPerExtraGuest = costPerExtraGuest;
	}

	public boolean isWifi() {
		return wifi;
	}

	public void setWifi(boolean wifi) {
		this.wifi = wifi;
	}

	public boolean isAc() {
		return ac;
	}

	public void setAc(boolean ac) {
		this.ac = ac;
	}

	public boolean isHeating() {
		return heating;
	}

	public void setHeating(boolean heating) {
		this.heating = heating;
	}

	public boolean isKitchen() {
		return kitchen;
	}

	public void setKitchen(boolean kitchen) {
		this.kitchen = kitchen;
	}

	public boolean isTv() {
		return tv;
	}

	public void setTv(boolean tv) {
		this.tv = tv;
	}

	public boolean isParking() {
		return parking;
	}

	public void setParking(boolean parking) {
		this.parking = parking;
	}

	public boolean isElevator() {
		return elevator;
	}

	public void setElevator(boolean elevator) {
		this.elevator = elevator;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public int getNumOfReviews() {
		return numOfReviews;
	}

	public void setNumOfReviews(int numOfReviews) {
		this.numOfReviews = numOfReviews;
	}

	public double getAverageRating() {
		return averageRating;
	}

	public void setAverageRating(double averageRating) {
		this.averageRating = averageRating;
	}

	public User getHost() {
		return host;
	}

	public void setHost(User host) {
		this.host = host;
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

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

}