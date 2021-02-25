package ru.yakimov.aviato.persistence.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import ru.yakimov.aviato.dto.BookingDto;
import ru.yakimov.aviato.model.Booking;

import java.util.List;

@Repository
@RepositoryRestResource(path = "booking")
public interface BookingRepository extends CrudRepository<Booking, Integer> {
    @Query("""
             SELECT 
             B.ID                       AS BOOKING_ID,
             B.SEAT_NUMBER              AS SEAT_NUMBER,
             ST.NAME                    AS SEAT_TYPE_NAME,
             F.ID                       AS F_FLIGHT_ID,
             F.SCHEDULED_DEPARTURE_TIME AS F_SCHEDULED_DEPARTURE_TIME,
             F.SCHEDULED_ARRIVAL_TIME   AS F_SCHEDULED_ARRIVAL_TIME,
             R.ID                       AS F_R_ROUTE_ID,
             AM.NAME                    AS F_AIRPLANE_MODEL_NAME,
             DEP_A.NAME                 AS F_R_DEPARTURE_AIRPORT_NAME,
             DEP_A.CITY                 AS F_R_DEPARTURE_AIRPORT_CITY,
             DEST_A.NAME                AS F_R_DESTINATION_AIRPORT_NAME,
             DEST_A.CITY                AS F_R_DESTINATION_AIRPORT_CITY
             FROM BOOKING B
             LEFT JOIN SEAT_TYPE ST ON ST.TYPE = B.SEAT_TYPE
             LEFT JOIN FLIGHT F ON F.ID = B.FLIGHT_ID
            LEFT JOIN ROUTE R ON F.ROUTE_ID = R.ID
            LEFT JOIN AIRPORT DEP_A ON DEP_A.ID = R.DEPARTURE_AIRPORT_ID
            LEFT JOIN AIRPORT DEST_A ON DEST_A.ID = R.DESTINATION_AIRPORT_ID
            LEFT JOIN AIRPLANE A ON R.AIRPLANE_ID = A.ID
            LEFT JOIN AIRPLANE_MODEL AM ON A.MODEL_ID = AM.ID
            WHERE B.PERSON_ID = :personId
           """)
    List<BookingDto> findDtoByPersonId(int personId);
}
