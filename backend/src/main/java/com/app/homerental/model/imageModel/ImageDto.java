package com.app.homerental.model.imageModel;

import lombok.Data;


public class ImageDto {

    private long id;

    private String name;
    private String type;

    private Long userId;
    private Long listingId;

    private byte[] picByte;

    public ImageDto(){
    }

    public ImageDto(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getListingId() {
		return listingId;
	}

	public void setListingId(Long listingId) {
		this.listingId = listingId;
	}

	public byte[] getPicByte() {
		return picByte;
	}

	public void setPicByte(byte[] picByte) {
		this.picByte = picByte;
	}
    
    

}
