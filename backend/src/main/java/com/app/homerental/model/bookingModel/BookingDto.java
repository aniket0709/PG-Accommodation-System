package com.app.homerental.model.bookingModel;

import lombok.Data;

import java.util.Date;

@Data
public class BookingDto {
    private long id;
    private Date date;

    private long listingId;
    private String listingTitle;
    private long userId;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public long getListingId() {
		return listingId;
	}
	public void setListingId(long listingId) {
		this.listingId = listingId;
	}
	public String getListingTitle() {
		return listingTitle;
	}
	public void setListingTitle(String listingTitle) {
		this.listingTitle = listingTitle;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
    

}