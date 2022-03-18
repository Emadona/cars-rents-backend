import * as mongoose from "mongoose"
import CarSchema, { CarDocument, CarModel } from "../../../../src/cars_rent/data/models/CarModels"
import CarsRentSchema, { CarsRentDoc, CarsRentModel } from "../../../../src/cars_rent/data/models/CarsRentModels"

export const prepareDb = async (client: mongoose.Mongoose) =>{
    const model = client.model<CarsRentDoc>('cars_rents',CarsRentSchema) as CarsRentModel

    const CarsRentDocs = await model.insertMany(CarsRents)
    
    return CarsRentDocs
} 

export const cleanUpDb = async (client: mongoose.Mongoose) =>{
    await client.connection.db.dropCollection('cars_rents')
}


export const prepareCarDb = async (client: mongoose.Mongoose) =>{
  const model = client.model<CarDocument>('cars',CarSchema) as CarModel

  const Cars = await model.insertMany(cars)
  
  return Cars
} 

export const cleanUpCarDb = async (client: mongoose.Mongoose) =>{
  await client.connection.db.dropCollection('cars')
}


const CarsRents = [
    {
        name: 'name1',
        type: 'type1',
        rating: 4,
        display_img_url: 'CarsRent.jpg',
        location: {
            coordinates: { longitude: 45.460476, latitude: 9.153341 },
          },
          address: {
            street: 'Road 1',
            city: 'City',
            parish: 'Parish',
            zone: 'Zone',
          },
    },
    {
        name: 'name2',
        type: 'type1',
        rating: 4,
        display_img_url: 'CarsRent.jpg',
        location: {
            coordinates: { longitude: 45.467476, latitude: 9.159341 },
          },
          address: {
            street: 'Road 1',
            city: 'City',
            parish: 'Parish',
            zone: 'Zone',
          },
    },
    {
        name: 'name3',
        type: 'type1',
        rating: 4,
        display_img_url: 'CarsRent.jpg',
        location: {
            coordinates: { longitude: 45.470476, latitude: 9.193341 },
          },
          address: {
            street: 'Road 1',
            city: 'City',
            parish: 'Parish',
            zone: 'Zone',
          },
    },
    {
        name: 'name4',
        type: 'type3',
        rating: 4,
        display_img_url: 'CarsRent.jpg',
        location: {
            coordinates: { longitude: 45.466476, latitude: 9.153741 },
          },
          address: {
            street: 'Road 1',
            city: 'City',
            parish: 'Parish',
            zone: 'Zone',
          },
    },
    {
        name: 'name5',
        type: 'type3',
        rating: 4,
        display_img_url: 'CarsRent.jpg',
        location: {
            coordinates: { longitude: 45.468476, latitude: 9.159341 },
          },
          address: {
            street: 'Road 1',
            city: 'City',
            parish: 'Parish',
            zone: 'Zone',
          },
    }
]

const cars = [
  {
    name: 'car1',
    carsRentId: '6218d6eea5594d091f3060ee',
    type: 'type1',
    description: 'no',
    available: 'true',
    image_url: 'car.jpg',
    doors: '5',
    price: '555',
    location: {
      coordinates: { longitude: 40.33, latitude: 73.23 },
    }
  },
    {
      name: 'car2',
      carsRentId: '6218d6eea5594d091f3060ee',
      type: 'type1',
      description: 'no',
      available: 'true',
      image_url: 'car.jpg',
      doors: '5',
      price: '666',
      location: {
        coordinates: { longitude: 40.33, latitude: 73.23 },
      }
    },
      {
        name: 'car3',
        carsRentId: '6218d6eea5594d091f3060ee',
        type: 'type1',
        description: 'no',
        available: 'true',
        image_url: 'car.jpg',
        doors: '5',
        price: '777',
        location: {
          coordinates: { longitude: 40.33, latitude: 73.23 },
        }
      },
        {
          name: 'car4',
          carsRentId: '6218d6eea5594d091f3060ee',
          type: 'type1',
          description: 'no',
          available: 'true',
          image_url: 'car.jpg',
          doors: '5',
          price: '444',
          location: {
            coordinates: { longitude: 40.33, latitude: 73.23 },
          }
        },
          {
            name: 'car5',
            carsRentId: '6218d6eea5594d091f3060ee',
            type: 'type2',
            description: 'no',
            available: 'true',
            image_url: 'car.jpg',
            doors: '5',
            price: '888',
            location: {
              coordinates: { longitude: 40.33, latitude: 73.23 },
            },
  }
]