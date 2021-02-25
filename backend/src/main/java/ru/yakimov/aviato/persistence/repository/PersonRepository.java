package ru.yakimov.aviato.persistence.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;
import ru.yakimov.aviato.model.Person;

import java.util.Optional;

@Repository
@RepositoryRestResource(path = "person")
public interface PersonRepository extends CrudRepository<Person, Long> {
    @RestResource(path = "login", rel = "login")
    Optional<Person> findByUsernameAndPassword(String username, String password);
}
