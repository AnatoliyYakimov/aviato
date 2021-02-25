export interface AirplaneDto {
  airplaneId: number,
  serialNumber: string,
  modelName: string,
  maxSeatsCount: number,
  seatsInfo: AirplaneDtoSeats[]
}

export interface AirplaneDtoSeats {
  seatType: string,
  seatTypeName: string,
  seatsCount: number
}
