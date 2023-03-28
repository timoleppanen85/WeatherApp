import { Weather } from "./weather";

export interface Location {
    Id: number;
    Name: string;
    Weather: Weather[];
  }
  