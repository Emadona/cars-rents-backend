import 'mocha'
import chai, {expect, use}from 'chai'
import SignInUseCase from '../../../src/auth/usecases/SignInUseCase'
import FakeRepository from '../helpers/FakeRepository'
import IAuthRepository from '../../../src/auth/domain/IAuthRepository'
import IPasswordService from '../../../src/auth/services/IPasswordService'
import FakePasswordService from '../helpers/FakePasswordService'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
describe('SignINUseCase', ()=> {
    let sut: SignInUseCase
    let repository: IAuthRepository
    let passwordService: IPasswordService

    const user = {   
        email: 'kh.emad10@gmail.com',
        id : '1234',
        name : 'emad',
        password: '$dfcle4596itkADetgthibkf.ldef45thkdfddlsprgtg',
        type: 'email'
    }

    beforeEach(()=>{
        repository = new FakeRepository()
        passwordService = new FakePasswordService()
        sut = new SignInUseCase(repository, passwordService)
    })

    it('should throw error when user is not found', async ()=>{
        const user = {email: 'wrong@gmail.com' , password: '1234'}
        await expect(sut.execute(user.email, user.password)).to.be.rejectedWith('User Not Found')
    })

    it('should return userId when user is found', async()=>{
        const id = await sut.execute(user.email, user.password)
        expect(id).to.be.equal(user.id)
    })

    it('should return userId when user with gmail auth is found', async()=>{
        const id = await sut.execute('ahmed@gmail.com', '')
        expect(id).to.be.equal('1236')
    })
})