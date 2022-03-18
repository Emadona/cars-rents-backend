import { Car } from "./Car";
import CarsRent from "./CarsRent";
import { Location } from "./Location";
import Pageable from "./Pageable";

export default interface ICarsRentRepository{
    findAll(page: number, pageSize: number): Promise<Pageable<CarsRent>>
    findOne(id: string): Promise<CarsRent>
    findByLocation(location: Location, page: number, pageSize: number): Promise<Pageable<CarsRent>>
    search(page: number, pageSize: number, quiry: string): Promise<Pageable<CarsRent>>
    getCarsFromCarsRent(CarsRentId: string):Promise<Car[]>
    
}