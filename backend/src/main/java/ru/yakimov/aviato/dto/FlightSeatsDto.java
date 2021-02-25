package ru.yakimov.aviato.dto;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;
import ru.yakimov.aviato.constants.SeatTypes;

import java.math.BigDecimal;

@Value
@Builder
public class FlightSeatsDto {

    @Id
    Integer flightId;
    SeatTypes type;
    String typeName;
    Integer totalSeatsCount;
    Integer freeSeatsCount;
    BigDecimal price;
}
