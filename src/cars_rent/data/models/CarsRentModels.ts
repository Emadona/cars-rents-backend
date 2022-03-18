import * as mongoose from 'mongoose'
import { Address } from '../../domain/Address';
import pagination from 'mongoose-paginate-v2'
import { Location } from '../../domain/Location';
export interface CarsRentDoc extends mongoose.Document {
    name: string
    type: string
    rating: number
    display_img_url: string
    location: { coordinates: Location }
    address: Address
  }
  
export interface CarsRentModel
  extends mongoose.PaginateModel<CarsRentDoc> {}

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: {
        longitude: { type: Number },
        latitude: { type: Number },
      },
      required: true,
    },
  })

  const CarsRentSchema = new mongoose.Schema({
    name: { type: String, required: true, index: 'text' },
    type: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    display_img_url: { type: String, required: true },
    location: {
      type: pointSchema,
      index: '2dsphere',
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      parish: { type: String, required: true },
      zone: { type: String },
    },
  })
  
  CarsRentSchema.plugin(pagination)
  export default CarsRentSchema



  