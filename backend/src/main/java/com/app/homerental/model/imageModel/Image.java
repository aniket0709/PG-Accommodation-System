package com.app.homerental.model.imageModel;

import com.app.homerental.model.listingModel.Listing;
import com.app.homerental.model.userModel.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id", nullable = false)
    private long id;

    private String name;
    private String type;

    @Column(length = 100000000, columnDefinition = "mediumblob")
    private byte[] picByte;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="user_id", nullable = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="listing_id", nullable = true)
    private Listing listing;


    public Image() {
    }

    public Image(String name, String type, byte[] picByte) {
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

	public byte[] getPicByte() {
		return picByte;
	}

	public void setPicByte(byte[] picByte) {
		this.picByte = picByte;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Listing getListing() {
		return listing;
	}

	public void setListing(Listing listing) {
		this.listing = listing;
	}
    
    

}
