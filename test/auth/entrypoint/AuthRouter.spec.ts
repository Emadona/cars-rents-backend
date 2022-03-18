import IAuthRepository from "../../../src/auth/domain/IAuthRepository"
import express  from 'express'
import FakeRepository from "../helpers/FakeRepository"
import JwtTokenService from "../../../src/auth/data/services/JwtTokenService"
import BcryptPasswordService from "../../../src/auth/data/services/BcryptPasswordService"
import AuthRouter from "../../../src/auth/entrypoint/AuthRouter"
import request from 'supertest'
import { expect } from "chai"
import FakePasswordService from "../helpers/FakePasswordService"

describe('AuthRouter', ()=>{


    const user =    {   
        email: 'kh.emad10@gmail.com',
        id : '1234',
        name : 'emad',
        password: '$dfcle4596itkADetgthibkf.ldef45thkdfddlsprgtg',
        type: 'email'
    }


    let repository: IAuthRepository
    let app: express.Application

    beforeEach(()=>{
        repository = new FakeRepository()
        let tokenService = new JwtTokenService('privateKey')
        let passwordService = new FakePasswordService()

        app = express()
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))
        app.use(
            '/auth', AuthRouter.configure(repository, tokenService, passwordService)
        )
    })

    // it('should return 404 when user is not found', async()=>{
    //     await request(app).post('/auth/signin').send({}).expect(404)
    // })

    // it('should return 200 and token when user is found', async()=>{
    //     await await request(app).post('/auth/signin')
    //     .send(user)
    //     .set('Accept', 'application/json')
    //     .expect('Content-type', /json/)
    //     .expect(200)
    //     .then((res)=>{
    //         expect(res.body.auth_token).to.not.be.empty
    //     })
    // })
    // it('should added user and return id', async () => {
    //     await request(app)
    //       .post('/auth/signup')
    //       .send({name:'ahmmed', email: 'ahhmed@gmail.com', 
    //       password: '$dfcle4596itkADetgthibkf.ldef45thkdfddlsprgtg', 'auth_type': 'email'})
    //       .set('Accept', 'application/json')
    //       .expect('Content-type', /json/)
    //       .expect(200)
    //       .then((res) => {
    //         expect(res.body.auth_token).to.not.be.empty
    //       })
    //   })

    //   it('should return 404 when user is found', async()=>{
    //     await request(app).post('/auth/signup').send({name:'ahmmed', email: 'kh.emad10@gmail.com', 
    //     password: '$dfcle4596itkADetgthibkf.ldef45thkdfddlsprgtg', 'auth_type': 'email'}).expect(404)
    // })



    it('should return 422 when there is a mistake in body', async () => {
        await request(app)
          .post('/auth/signup')
          .send({name:'ahmmed', email: 'ahhmed@gmail.com', 
          password: '', 'auth_type': 'email'})
          .set('Accept', 'application/json')
          .expect('Content-type', /json/)
          .expect(422)
          .then((res) => {
            expect(res.body.errors).to.not.be.empty
          })
      })
})