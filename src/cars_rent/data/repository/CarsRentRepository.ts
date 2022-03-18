import { Mongoose,PaginateResult } from "mongoose";
import { Car } from "../../domain/Car";
import CarsRent from "../../domain/CarsRent";
import { Location } from "../../domain/Location";
import ICarsRentRepository from "../../domain/ICarsRentRepository";
import Pageable from "../../domain/Pageable";
import CarsRentSchema, { CarsRentDoc, CarsRentModel } from "../models/CarsRentModels";

export default class CarsRentRepository implements ICarsRentRepository{
    constructor(private readonly client: Mongoose){}

    async findAll(page: number, pageSize: number): Promise<Pageable<CarsRent>> {
        const model = this.client.model<CarsRentDoc>('cars_rents', CarsRentSchema) as CarsRentModel
        const pageOptions = { page: page, limit: pageSize }

    const pageResults = await model.paginate({}, pageOptions).catch((_) => null)
    return this.carsRentFromPageResults(pageResults)
    }

    async findOne(id: string): Promise<CarsRent> {
        const model = this.client.model<CarsRentDoc>('cars_rents', CarsRentSchema) as CarsRentModel
        
        const result = await model.findById(id)
        
        if (result === null) return Promise.reject('Cars Rent not found')

        return new CarsRent(
            result.id,
            result.name,
            result.rating,
            result.display_img_url,
            result.location.coordinates,
            result.address
        )
    }
    async findByLocation(location: Location, page: number, pageSize: number): Promise<Pageable<CarsRent>> {
      const model = this.client.model<CarsRentDoc>('cars_rents', CarsRentSchema) as CarsRentModel
      const pageOptions = { page: page, limit: pageSize, forceCountFn: true }
      const geoQuery = {
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [45.460476, 9.153341],
            },
            $maxDistance: 2,
          },
        },
      }

      const pageResults = await model
      .paginate(geoQuery, pageOptions)
      .catch((err) => err)
      
      return this.carsRentFromPageResults(pageResults)
    }
    async search(page: number, pageSize: number, quiry: string): Promise<Pageable<CarsRent>> {
        const model = this.client.model<CarsRentDoc>('cars_rents', CarsRentSchema) as CarsRentModel
        const pageOptions = { page: page, limit: pageSize }
        const textQuery = { $text: { $search: quiry } }

        const results = await model
        .paginate(textQuery, pageOptions)
        .catch((_) => null)

        return this.carsRentFromPageResults(results)

    }
    getCarsFromCarsRent(CarsRentId: string): Promise<Car[]> {
        throw new Error("Method not implemented.");
    }

    private carsRentFromPageResults(
        pageResults: PaginateResult<CarsRentDoc> | null
      ) {
        if (pageResults === null || pageResults.docs.length === 0)
          return Promise.reject('CarsRent not found')
    
        const results = pageResults.docs.map<CarsRent>(
          (model) =>
            new CarsRent(
              model.id,
              model.name,
              model.rating,
              model.display_img_url,
              model.location.coordinates,
              model.address
            )
        )
        return new Pageable<CarsRent>(
            pageResults.page ?? 0,
            pageResults.limit,
            pageResults.totalPages,
            results
          )
        }

}