package com.reviewmotion.moviereviewapi.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "films")
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "filmtype")
    private String filmtype;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "summary")
    private String summary;

    @Column(name = "img_url")
    private String imgUrl;



}