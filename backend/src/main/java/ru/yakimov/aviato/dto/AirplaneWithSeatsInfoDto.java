package ru.yakimov.aviato.dto;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class AirplaneWithSeatsInfoDto {
    Integer airplaneId;
    String serialNumber;
    String modelName;
    String maxSeatsCount;
    List<AirplaneSeatInfoDto> seatsInfo;
}
