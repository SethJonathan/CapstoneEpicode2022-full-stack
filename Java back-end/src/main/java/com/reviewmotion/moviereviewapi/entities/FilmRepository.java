package com.reviewmotion.moviereviewapi.entities;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmRepository extends JpaRepository<Film, Long> {
}