package ru.yakimov.aviato.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class AirplaneSeatInfoDto {
    String seatType;
    String seatTypeName;
    Integer seatsCount;
}
