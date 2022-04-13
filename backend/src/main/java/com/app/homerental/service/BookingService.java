package com.app.homerental.service;

import com.app.homerental.model.bookingModel.BookingDto;
import com.app.homerental.model.bookingModel.BookingPost;

import java.util.List;

public interface BookingService {

    BookingDto findById(Long id) throws Exception;
    List<BookingDto> findAll();
    List<BookingDto> returnMyBookings(long id);
    List<BookingDto> returnListingBookings(long id);

    List<BookingDto> newBooking(BookingPost bookingPost);
    BookingDto save(BookingDto bookingDto);

    void deleteById(Long id);

}
