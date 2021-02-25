export interface Flight {
  id: number,
  routeId: number,
  scheduledDepartureTime: Date,
  scheduledArrivalTime: Date,
  actualArrivalTime: Date
  actualDepartureTime: Date
}
