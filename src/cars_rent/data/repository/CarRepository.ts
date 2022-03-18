import * as mongoose from "mongoose";
import { Car } from "../../domain/Car";
import ICarRepository from "../../domain/ICarRepository";
import { Location } from "../../domain/Location";
import Pageable from "../../domain/Pageable";
import CarSchema, { CarDocument, CarModel } from "../models/CarModels";

export default class CarRepository implements ICarRepository{
    constructor(private readonly client: mongoose.Mongoose){}

    async findAll(page: number, pageSize: number): Promise<Pageable<Car>> {
      const model = this.client.model<CarDocument>('cars', CarSchema) as CarModel
      const pageOptions = { page: page, limit: pageSize }

    const pageResults = await model.paginate({}, pageOptions).catch((_) => null)
    return this.carFromPageResults(pageResults)

    }
    async findOne(id: string): Promise<Car> {
        const model = this.client.model<CarDocument>('cars', CarSchema) as CarModel
        const result = await model.findById(id)

        if (result === null) return Promise.reject('Car not found')

        return new Car(result.id,
            result.carsRentId,
            result.name,
            result.type,
            result.available,
            result.imageUrl,
            result.description,
            result.doors,
            result.price,
            result.location.coordinates
            )
    }
    async findByLocation(location: Location, page: number, pageSize: number): Promise<Pageable<Car>> {
        const model = this.client.model<CarDocument>('cars', CarSchema) as CarModel
        const pageOptions = { page: page, limit: pageSize, 
          forceCountFn: true 
        }
        const geoQuery = {
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [location.longitude, location.latitude],
              },
              $maxDistance: 2,
            },
          },
        }

        const pageResults = await model
        .paginate(geoQuery, pageOptions)
        .catch((err) => err)
        
        return this.carFromPageResults(pageResults)

    }
    async search(page: number, pageSize: number, query: string): Promise<Pageable<Car>> {
        const model = this.client.model<CarDocument>('cars', CarSchema) as CarModel
        const pageOptions = { page: page, limit: pageSize }
        const textQuery = { $text: { $search: query } }

        const results = await model
        .paginate(textQuery, pageOptions)
        .catch((_) => null)

        return this.carFromPageResults(results)


    }

    private carFromPageResults(
        pageResults: mongoose.PaginateResult<CarDocument> | null
      ) {
        console.log('page results: '+pageResults)
        if (pageResults === null || pageResults.docs.length === 0)
          return Promise.reject('Cars Not Found')
    
        const results = pageResults.docs.map<Car>(
          (model) =>
            new Car(
              model.id,
              model.carsRentId,
              model.name,
              model.type,
              model.available,
              model.imageUrl,
              model.description,
              model.doors,
              model.price,
              model.location.coordinates
            )
        )
        return new Pageable<Car>(
            pageResults.page ?? 0,
            pageResults.limit,
            pageResults.totalPages,
            results
          )
        }   
}