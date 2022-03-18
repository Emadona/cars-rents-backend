import { Car } from "./Car";
import { Location } from "./Location";
import Pageable from "./Pageable";

export default interface ICarRepository{
    findAll(page: number, pageSize: number): Promise<Pageable<Car>>
    findOne(id: string): Promise<Car>
    findByLocation(location: Location, page: number, pageSize: number): Promise<Pageable<Car>>
    search(page: number, pageSize: number, query: string): Promise<Pageable<Car>>


}