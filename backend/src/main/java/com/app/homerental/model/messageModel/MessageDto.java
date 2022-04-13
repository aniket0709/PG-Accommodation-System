package com.app.homerental.model.messageModel;

import lombok.Data;

import java.util.Date;

@Data
public class MessageDto {

    private long id;
    private String text;
    private Date sendDate;
    private boolean seen;

    private long listingId;
    private String listingTitle;
    private long guestId;
    private String guestName;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Date getSendDate() {
		return sendDate;
	}
	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}
	public boolean isSeen() {
		return seen;
	}
	public void setSeen(boolean seen) {
		this.seen = seen;
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
	public long getGuestId() {
		return guestId;
	}
	public void setGuestId(long guestId) {
		this.guestId = guestId;
	}
	public String getGuestName() {
		return guestName;
	}
	public void setGuestName(String guestName) {
		this.guestName = guestName;
	}

}
