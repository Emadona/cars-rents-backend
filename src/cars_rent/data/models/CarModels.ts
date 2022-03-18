import * as mongoose from 'mongoose'
import { Location } from '../../domain/Location'
import pagination from 'mongoose-paginate-v2'

export interface CarDocument extends mongoose.Document{
    name: string
    carsRentId: string
    type: string
    description: string
    available: boolean
    imageUrl: string
    doors: number
    price: number
    location: { coordinates: Location }

}
export interface CarModel
  extends mongoose.PaginateModel<CarDocument> {}


// export interface CarModel extends mongoose.Model<CarDocument> {}

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Point',
    enum: ['Point'],
  },
  coordinates: {
    type: {
      longitude: { type: Number },
      latitude: { type: Number },
    },
  },
})


const CarSchema = new mongoose.Schema({
    name: { type:String, required: true},
    carsRentId: { type:String, required: true},
    type: { type:String, required: true},
    description: { type:String, required: true},
    available: { type:String, required: true},
    image_url: { type:String },
    doors: { type:String, required: true},
    price: { type:String, required: true},
    location: {
        type: pointSchema,
        index: '2dsphere',
      }
})

CarSchema.plugin(pagination)
  export default CarSchema
