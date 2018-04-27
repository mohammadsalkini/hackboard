package io.refugeescode.hackboard.model;


import io.refugeescode.hackboard.config.Constants;
import io.refugeescode.hackboard.domain.AbstractAuditingEntity;
import io.undertow.servlet.core.Lifecycle;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;


@Entity
public class Projects {


    @Id
<<<<<<< HEAD
    @GeneratedValue
    private Long id;
=======
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(length = 100, nullable = false)
>>>>>>> 5c149daa549654040395e8a33be70c9bdd6fdbc5
    private String title;

    @NotNull
    @Size(min = 1, max = 10000)
    @Column(length = 10000,  nullable = false)
    private String description;

    public Projects() {
    }

<<<<<<< HEAD
=======

>>>>>>> 5c149daa549654040395e8a33be70c9bdd6fdbc5
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Projects{" +
            "id=" + id +
            ", title='" + title + '\'' +
            ", description='" + description + '\'' +
            '}';
    }

}
