import { IIndicator } from "./indicator.model";

export interface IResult {
  meta: object;
  timestamp: number[];
  indicators: IIndicator
}
