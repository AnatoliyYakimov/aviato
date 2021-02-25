package ru.yakimov.aviato.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder(toBuilder = true)
public class AirplaneDto {
    Integer airplaneId;
    String serialNumber;
    String modelName;
    String maxSeatsCount;
}
