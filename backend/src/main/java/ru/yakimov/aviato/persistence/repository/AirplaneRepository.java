package ru.yakimov.aviato.persistence.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import ru.yakimov.aviato.dto.AirplaneDto;
import ru.yakimov.aviato.dto.AirplaneSeatInfoDto;
import ru.yakimov.aviato.model.Airplane;

import java.util.List;

@Repository
@RepositoryRestResource(path = "airplane")
public interface AirplaneRepository extends CrudRepository<Airplane, Integer> {

    @Query("""
            SELECT 
            A.ID               AS AIRPLANE_ID,
            A.SERIAL_NUMBER    AS SERIAL_NUMBER,
            AM.NAME            AS MODEL_NAME,
            AM.MAX_SEATS_COUNT AS MAX_SEATS_COUNT
            FROM AIRPLANE A
            LEFT JOIN AIRPLANE_MODEL AM ON AM.ID = A.MODEL_ID
           """)
    List<AirplaneDto> getAllAirplaneDtos();

    @Query("""
            SELECT 
            C.SEAT_TYPE AS SEAT_TYPE,
            ST.NAME     AS SEAT_TYPE_NAME,
            C.COUNT     AS SEATS_COUNT
            FROM AIRPLANE A
            LEFT JOIN AIRPLANE_SEATS_COUNT C ON A.ID = C.AIRPLANE_ID
            LEFT JOIN SEAT_TYPE ST ON C.SEAT_TYPE = ST.TYPE
            WHERE A.ID = :airplaneId
           """)
    List<AirplaneSeatInfoDto> getAirplaneSeatsInfo(int airplaneId);
}
