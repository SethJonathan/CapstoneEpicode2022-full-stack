package com.reviewmotion.moviereviewapi.controllers;

import com.reviewmotion.moviereviewapi.entities.Film;
import com.reviewmotion.moviereviewapi.entities.FilmRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/films")
public class FilmController {
    private final FilmRepository filmRepository;

    public FilmController(FilmRepository filmRepository){
        this.filmRepository = filmRepository;
    }

    @PostMapping
    public Film newFilm(@RequestBody Film film){
        return this.filmRepository.save(film);
    }

    @GetMapping
    public List<Film> getFilms(){
        return filmRepository.findAll();
    }

    @GetMapping("/{filmId}")
    public Optional<Film> getFilm(@PathVariable("filmId") Long filmId){
        var film = filmRepository.findById(filmId);
        return film;
    }

    @PutMapping("/{filmId}")
    public Optional<Film> updateFilm(@PathVariable("filmId") Long filmId, @RequestBody Film updatedFilm){
        return this.filmRepository.findById(filmId).map(oldFilm -> this.filmRepository.save(updatedFilm));
    }

    @DeleteMapping("/{filmId}")
    public void deleteFilm(@PathVariable("filmId") Long filmId){
        this.filmRepository.deleteById(filmId);
    }

}
