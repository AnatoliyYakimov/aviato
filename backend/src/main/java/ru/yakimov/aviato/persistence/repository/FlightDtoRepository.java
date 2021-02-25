package ru.yakimov.aviato.persistence.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;
import ru.yakimov.aviato.dto.FlightDto;
import ru.yakimov.aviato.dto.FlightSeatsDto;
import ru.yakimov.aviato.model.Flight;
import ru.yakimov.aviato.model.SeatType;

import java.util.List;

@Repository
@RepositoryRestResource(path = "flight")
public interface FlightDtoRepository extends CrudRepository<Flight, Integer> {

    @Query("""
            SELECT 
             F.ID AS FLIGHT_ID,
             F.SCHEDULED_DEPARTURE_TIME,
             F.SCHEDULED_ARRIVAL_TIME,
             R.ID AS R_ROUTE_ID,
             AM.NAME AS AIRPLANE_MODEL_NAME,
             DEP_A.NAME AS R_DEPARTURE_AIRPORT_NAME,
             DEP_A.CITY AS R_DEPARTURE_AIRPORT_CITY,
             DEST_A.NAME AS R_DESTINATION_AIRPORT_NAME,
             DEST_A.CITY AS R_DESTINATION_AIRPORT_CITY
             FROM FLIGHT F
            LEFT JOIN ROUTE R ON F.ROUTE_ID = R.ID
            LEFT JOIN AIRPORT DEP_A ON DEP_A.ID = R.DEPARTURE_AIRPORT_ID
            LEFT JOIN AIRPORT DEST_A ON DEST_A.ID = R.DESTINATION_AIRPORT_ID
            LEFT JOIN AIRPLANE A ON R.AIRPLANE_ID = A.ID
            LEFT JOIN AIRPLANE_MODEL AM ON A.MODEL_ID = AM.ID
            WHERE F.ID = :id
           """)
    FlightDto findById(int id);

    @Query("""
            SELECT 
             F.ID AS FLIGHT_ID,
             F.SCHEDULED_DEPARTURE_TIME,
             F.SCHEDULED_ARRIVAL_TIME,
             R.ID AS R_ROUTE_ID,
             AM.NAME AS AIRPLANE_MODEL_NAME,
             DEP_A.NAME AS R_DEPARTURE_AIRPORT_NAME,
             DEP_A.CITY AS R_DEPARTURE_AIRPORT_CITY,
             DEST_A.NAME AS R_DESTINATION_AIRPORT_NAME,
             DEST_A.CITY AS R_DESTINATION_AIRPORT_CITY
             FROM FLIGHT F
            LEFT JOIN ROUTE R ON F.ROUTE_ID = R.ID
            LEFT JOIN AIRPORT DEP_A ON DEP_A.ID = R.DEPARTURE_AIRPORT_ID
            LEFT JOIN AIRPORT DEST_A ON DEST_A.ID = R.DESTINATION_AIRPORT_ID
            LEFT JOIN AIRPLANE A ON R.AIRPLANE_ID = A.ID
            LEFT JOIN AIRPLANE_MODEL AM ON A.MODEL_ID = AM.ID
            WHERE CAST(ROUTE_ID AS VARCHAR) LIKE :routeId
            AND ACTUAL_DEPARTURE_TIME IS NULL
            AND ACTUAL_ARRIVAL_TIME IS NULL
            ORDER BY R_DEPARTURE_AIRPORT_NAME DESC
            OFFSET :offset LIMIT :limit
           
           """)
    List<FlightDto> findAllByRouteId(long offset, int limit, String routeId);

    @Query("""
            SELECT 
             COUNT(*)
             FROM FLIGHT F
            LEFT JOIN ROUTE R ON F.ROUTE_ID = R.ID
            WHERE CAST(ROUTE_ID AS VARCHAR) LIKE :routeId
            AND ACTUAL_DEPARTURE_TIME IS NULL
            AND ACTUAL_ARRIVAL_TIME IS NULL
           """)
    int countAllByRouteId(String routeId);

    @Query("""
           SELECT 
           F.ID                AS FLIGHT_ID,
           RSP.PRICE           AS PRICE,
           RSP.SEAT_TYPE       AS TYPE,
           ST.NAME            AS TYPE_NAME,
           C.COUNT             AS TOTAL_SEATS_COUNT,
           FS.FREE_SEATS_COUNT AS FREE_SEATS_COUNT
           FROM FLIGHT F
           LEFT JOIN ROUTE R ON R.ID = F.ROUTE_ID
           LEFT JOIN AIRPLANE A ON A.ID = R.AIRPLANE_ID
           LEFT JOIN ROUTE_SEAT_PRICE RSP ON R.ID = RSP.ROUTE_ID
           LEFT JOIN AIRPLANE_SEATS_COUNT C ON A.ID = C.AIRPLANE_ID AND C.SEAT_TYPE = RSP.SEAT_TYPE
           LEFT JOIN FLIGHT_FREE_SEATS_COUNT FS ON FS.FLIGHT_ID = F.ID AND FS.SEAT_TYPE = RSP.SEAT_TYPE
           LEFT JOIN SEAT_TYPE ST ON ST.TYPE = RSP.SEAT_TYPE
           WHERE F.ID = :flightId
           """)
    @RestResource(path = "seats")
    List<FlightSeatsDto> getAllFlightSeats(int flightId);

    @Query("""
            SELECT * FROM flight_free_seats(:seatType, :flightId)
           """)
    List<Integer> getFreeSeats(int flightId, SeatType seatType);
}
