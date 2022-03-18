import { Location } from "./Location";

export class Car {
    constructor(
      public readonly id: string,
      public readonly carsRentId: string,
      public readonly name: string,
      public readonly type: string,
      public readonly available: boolean,
      public readonly imageUrl: string,
      public readonly description: string,
      public readonly doors: number,
      public readonly price: number,
      public readonly location: Location
    ) {}
  }