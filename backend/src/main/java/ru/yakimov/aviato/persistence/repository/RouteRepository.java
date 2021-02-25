package ru.yakimov.aviato.persistence.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import ru.yakimov.aviato.dto.RouteDto;
import ru.yakimov.aviato.model.Route;

import java.util.List;

@Repository
@RepositoryRestResource(path = "route")
public interface RouteRepository extends CrudRepository<Route, Integer> {

    @Query(
            """
            SELECT 
             R.ID AS ROUTE_ID,
             DEP_A.NAME AS DEPARTURE_AIRPORT_NAME,
             DEP_A.CITY AS DEPARTURE_AIRPORT_CITY,
             DEST_A.NAME AS DESTINATION_AIRPORT_NAME,
             DEST_A.CITY AS DESTINATION_AIRPORT_CITY
             FROM ROUTE R
            LEFT JOIN AIRPORT DEP_A ON DEP_A.ID = R.DEPARTURE_AIRPORT_ID
            LEFT JOIN AIRPORT DEST_A ON DEST_A.ID = R.DESTINATION_AIRPORT_ID
            WHERE DEP_A.CITY LIKE :departureAirportCity
            AND DEST_A.CITY LIKE :destinationAirportCity
            LIMIT :size OFFSET :page * :size
            """
    )
    List<RouteDto> findAll(Integer page,
                           Integer size,
                           String departureAirportCity,
                           String destinationAirportCity);

    @Query("""
           SELECT DISTINCT 
            A.CITY
           FROM ROUTE R
           LEFT JOIN AIRPORT A ON A.ID = R.DEPARTURE_AIRPORT_ID
           UNION 
           SELECT DISTINCT 
            A.CITY
           FROM ROUTE R
           LEFT JOIN AIRPORT A ON A.ID = R.DESTINATION_AIRPORT_ID
           """)
    List<String> getAllCities();

    @Query(
            """
            SELECT 
             COUNT(*)
             FROM ROUTE R
            LEFT JOIN AIRPORT DEP_A ON DEP_A.ID = R.DEPARTURE_AIRPORT_ID
            LEFT JOIN AIRPORT DEST_A ON DEST_A.ID = R.DESTINATION_AIRPORT_ID
            WHERE DEP_A.CITY LIKE :departureAirportCity
            AND DEST_A.CITY LIKE :destinationAirportCity
            """
    )
    Integer getCount(String departureAirportCity,
                     String destinationAirportCity);
}
