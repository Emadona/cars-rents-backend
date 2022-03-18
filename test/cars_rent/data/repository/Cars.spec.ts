import { expect } from 'chai'
import dotenv from 'dotenv'
import { Mongoose } from 'mongoose'
import CarRepository from '../../../../src/cars_rent/data/repository/CarRepository'
import ICarRepository from '../../../../src/cars_rent/domain/ICarRepository'
import { Location } from '../../../../src/cars_rent/domain/Location'
import { cleanUpCarDb, prepareCarDb } from '../helpers/Helpers'

dotenv.config()

describe('cars',()=>{
    let client: Mongoose
    let sut: ICarRepository
    beforeEach(()=>{
        client = new Mongoose()
        const connectStr = encodeURI(process.env.TEST_DB as string)
        client.connect(connectStr, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
          })
        sut = new CarRepository(client)
    })

    afterEach(()=>{
        client.disconnect()
    })

    // describe('find all', ()=>{
    //     beforeEach(async()=>{
    //         await prepareCarDb(client)
    //     })
    //     // afterEach(async()=>{
    //     //     await cleanUpCarDb(client)
    //     // })

    //     it('showld return cars', async()=>{
    //         const result = await sut.findAll(1,2)
    //         console.log(result.data[1].location)
    //         expect(result).to.not.be.empty

    //     })
    // })

    // describe('find location', ()=>{
    //     // beforeEach(async()=>{
    //     //     await prepareCarDb(client)
    //     // })
    //     // afterEach(async()=>{
    //     //     await cleanUpCarDb(client)
    //     // })

    //     it('showld return cars by location', async()=>{
    //         const location = new Location(40.33,  73.23)
    //         const result = await sut.findByLocation(location,1,2)
    //         expect(result).to.not.be.empty

    //     })
    // })

    describe('search', () => {

    
        it('returns promise reject with error message when no cars is found', async () => {
          const query = 'not present'
          await sut.search(1, 2, query).catch((err) => {
            expect(err).to.not.be.empty
          })
        })
    
        it('returns cars that matches query string', async () => {
          const query = 'name'
          const results = await sut.search(1, 2, query)
          console.log('results: '+results)
          expect(results.data.length).to.eq(2)
        })
      })
})