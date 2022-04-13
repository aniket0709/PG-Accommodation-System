package com.app.homerental.repository;

import com.app.homerental.model.bookingModel.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findAllByListingIdAndDateAfterAndAndDateBefore(long id, Date date1, Date date2);
    List<Booking> findAllByUserIdOrderByDateDesc(long id);
    List<Booking> findAllByListingIdOrderByDateDesc(long id);
}
