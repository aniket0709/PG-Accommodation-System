package com.app.homerental.model.listingModel;

import lombok.Getter;

import java.util.Date;


public class ListingParameters {
    private Date startDate;
    private Date endDate;
    private int guests;
    private String state;
    private String city;

    private RoomType type;
    private Double price;
    private Boolean wifi;
    private Boolean ac;
    private Boolean heating;
    private Boolean kitchen;
    private Boolean tv;
    private Boolean parking;
    private Boolean elevator;
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
	public int getGuests() {
		return guests;
	}
	public void setGuests(int guests) {
		this.guests = guests;
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
	public RoomType getType() {
		return type;
	}
	public void setType(RoomType type) {
		this.type = type;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Boolean getWifi() {
		return wifi;
	}
	public void setWifi(Boolean wifi) {
		this.wifi = wifi;
	}
	public Boolean getAc() {
		return ac;
	}
	public void setAc(Boolean ac) {
		this.ac = ac;
	}
	public Boolean getHeating() {
		return heating;
	}
	public void setHeating(Boolean heating) {
		this.heating = heating;
	}
	public Boolean getKitchen() {
		return kitchen;
	}
	public void setKitchen(Boolean kitchen) {
		this.kitchen = kitchen;
	}
	public Boolean getTv() {
		return tv;
	}
	public void setTv(Boolean tv) {
		this.tv = tv;
	}
	public Boolean getParking() {
		return parking;
	}
	public void setParking(Boolean parking) {
		this.parking = parking;
	}
	public Boolean getElevator() {
		return elevator;
	}
	public void setElevator(Boolean elevator) {
		this.elevator = elevator;
	}
    
    

}
