import { expect } from 'chai'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import CarsRentRepository from '../../../../src/cars_rent/data/repository/CarsRentRepository'
import ICarsRentRepository from '../../../../src/cars_rent/domain/ICarsRentRepository'
import { cleanUpDb, prepareDb } from '../helpers/Helpers'
dotenv.config()
describe('Cars Rent', ()=>{
    let client: mongoose.Mongoose
    let sut: ICarsRentRepository

    beforeEach(()=>{
        client = new mongoose.Mongoose()
        const connectStr = encodeURI(process.env.TEST_DB as string)
        client.connect(connectStr)
        sut = new CarsRentRepository(client)
    })

    afterEach(()=>{
        client.disconnect()
    })

    describe('Find All',()=>{
        beforeEach(async()=>{
            await prepareDb(client)
        })

        // afterEach(async ()=>{
        //     await cleanUpDb(client)
        // })

        it('showld return CarsRents', async()=>{
            const result = await sut.findAll(1,2)
            console.log(result)
            expect(result).to.not.be.empty
        })
    })
})