package com.app.homerental.model.bookingModel;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;


public class BookingPost {
    private Date startDate;
    private Date endDate;

    private long listingId;
    private long userId;
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
	public long getListingId() {
		return listingId;
	}
	public void setListingId(long listingId) {
		this.listingId = listingId;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
    
    

}