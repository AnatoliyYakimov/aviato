package ru.yakimov.aviato.dto;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Embedded;

@Value
@Builder
public class BookingDto {
    @Id
    Integer bookingId;
    @Embedded(prefix = "F_", onEmpty = Embedded.OnEmpty.USE_NULL)
    FlightDto flightDto;
    String seatTypeName;
    Integer seatNumber;
}
