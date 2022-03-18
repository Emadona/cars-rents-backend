import IAuthRepository from "../domain/IAuthRepository";
import IPasswordService from "../services/IPasswordService";

export default class SignInUseCase {
    constructor(private authRepository: IAuthRepository,
        private passwordService: IPasswordService){}

    public async execute(name: string, email: string, type:string, password: string){
        
        if(type === 'email') return await this.emailLogin(email,password)
        
        return await this.oauthLogin(name, email, type)
        }

    private async emailLogin(email: string, password: string){
        const user = await this.authRepository.find(email).catch((_)=> null)
        if( !user ||!(await this.passwordService.compare(user.password, password))) {
            return Promise.reject('invaled email or password')
        }
        return user.id
    }
    private async oauthLogin(name: string, email: string, type: string){
        const user = await this.authRepository.find(email).catch((_)=> null)
        if(user && user.type === 'email')return Promise.
        reject('email is already exists, please sign in with password')
        if(user) return user.id
        const userId = await this.authRepository.add(name , email,type)
        return userId
    }
}