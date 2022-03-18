import { Address } from "./Address";
import { Location } from "./Location";

export default class CarsRent{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly rating: number,
        public readonly displayImageUrl: string,
        public readonly location: Location,
        public readonly address: Address
    ){}
}


