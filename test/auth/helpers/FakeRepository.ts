import IAuthRepository from "../../../src/auth/domain/IAuthRepository";
import User from "../../../src/auth/domain/User";

export default class FakeRepository implements IAuthRepository{
    public users = [
        {   
            email: 'kh.emad10@gmail.com',
            id : '1234',
            name : 'emad',
            password: '$dfcle4596itkADetgthibkf.ldef45thkdfddlsprgtg',
            type: 'email'
        },
        {   
            email: 'ahmed@gmail.com',
            id : '1236',
            name : 'Ahmed',
            password: '',
            type: 'google'
        }

    ]

    public async find(email: string): Promise<User> {
        const user = this.users.find((x)=> x.email === email)
        if(! user) return Promise.reject('User Not Found')
        return new User(
            user?.id,
            user?.name,
            user?.email,
            user?.password,
            user?.type
        )
    }
    public async add(name: string, email: string, passwordHash: string, type: string): Promise<string> {
        const min = 1000
        const max = 9999
        const id = (Math.floor(Math.random() * (+ max - +min)) + +min).toString()

        this.users.push({
            email: email,
            id: id,
            name: name,
            password: passwordHash,
            type: type
        })

        return id
        
    }

}