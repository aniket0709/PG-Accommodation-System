package com.app.homerental.repository;

import com.app.homerental.model.reviewModel.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByListingHostId(Long id);
    List<Review> findAllByUserId(Long id);
}
