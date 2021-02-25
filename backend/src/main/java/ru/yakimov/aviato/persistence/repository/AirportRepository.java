package ru.yakimov.aviato.persistence.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import ru.yakimov.aviato.model.Airport;

@Repository
@RepositoryRestResource(path = "airport")
public interface AirportRepository extends CrudRepository<Airport, Integer> {
}
