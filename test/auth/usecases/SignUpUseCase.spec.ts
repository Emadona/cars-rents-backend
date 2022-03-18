import 'mocha'
import chai, {expect, use}from 'chai'
import SignUpUseCase from '../../../src/auth/usecases/SignUpUseCase'
import FakeRepository from '../helpers/FakeRepository'
import IAuthRepository from '../../../src/auth/domain/IAuthRepository'
import IPasswordService from '../../../src/auth/services/IPasswordService'
import FakePasswordService from '../helpers/FakePasswordService'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
describe('SignUpUseCase', ()=>{

    let sut: SignUpUseCase
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
        sut = new SignUpUseCase(repository, passwordService)
    })

    it('should throw error when user email is found', async ()=>{
            await expect(sut.execute(user.email,user.name,user.type,user.type)).to.be.rejectedWith('User is already found')
    })

    it('should return userId when user with password is secussfly add', async ()=>{
        await expect(sut.execute('new_user@gmail.com', 'new', 'email','12345')).to.be.toString()
    })
})