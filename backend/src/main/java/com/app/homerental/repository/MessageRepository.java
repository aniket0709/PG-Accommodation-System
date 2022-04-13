package com.app.homerental.repository;

import com.app.homerental.model.messageModel.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByListingId(Long idy);
    List<Message> findByGuestIdAndSeen(Long id, Boolean seen);
}
