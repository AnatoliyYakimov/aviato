import {AirplaneModel} from "./airplane-model";

export interface Airplane {
  serialNumber: string,
  economySeatsCount: number,
  businessSeatsCount: number,
  firstClassSeatsCount: number,
  modelId: number,
  model: AirplaneModel
}
