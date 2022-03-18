import mongoose from "mongoose";
import AuthRepository from "../../../../src/auth/data/repository/AuthRepository";
import IAuthRepository from "../../../../src/auth/domain/IAuthRepository";
import dotenv from 'dotenv'
import { expect } from "chai";
import User from "../../../../src/auth/domain/User";
dotenv.config()
describe('AuthRepository', ()=>{
    let client: mongoose.Mongoose
    let sut: IAuthRepository

    beforeEach(()=>{
        client = new mongoose.Mongoose()
        const connectStr = encodeURI(process.env.TEST_DB as string)
        client.connect(connectStr)
        sut = new AuthRepository(client)
    })

    afterEach(()=>{
        client.disconnect()
    })

    // it('should return user when user is found', async ()=>{
    //     const user = await sut.find('kh.emad@gmail.com')
    //     console.log(user)
    //     expect(user.name).to.be.equal('emad')
    // })

    // it('should return error when email not found', async()=>{
    //     await expect(sut.find('wrong@gmail.com')).to.be.rejectedWith('User not found')
    // })

    it('should add user to the database by email', async()=>{
        const user = {
            name: 'khalid',
            email: 'khalid@gmail.com',
            type: 'email',
            password: '1235678'
        }
        const userId = await sut.add(user.name, user.email,user.type, user.password).catch((_)=>null)
        expect(userId).to.not.be.empty 
    })

    

    // it('should add user to the database by google', async()=>{
    //     const user = {
    //         name: 'Ahmed3465',
    //         email: 'Ahmed3465@gmail.com',
    //         type: 'google',
    //         password: ''
    //     }
    //     const userId = await sut.add(user.name, user.email,user.type).catch((_)=>null)
    //     expect(userId).to.not.be.empty 
    // })
})