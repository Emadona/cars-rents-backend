import ITokenService from "../services/ITokenService";
import SignInUseCase from "../usecases/SignInUseCase";
import * as express from 'express'
import SignUpUseCase from "../usecases/SignUpUseCase";
import SignOutUseCase from "../usecases/SignOutUseCase";
export default class AuthController {
    private readonly signInUseCase: SignInUseCase
    private readonly signUpUseCase: SignUpUseCase
    private readonly signOutUseCase: SignOutUseCase
    private readonly tokenService: ITokenService
    constructor(signInUseCase: SignInUseCase, 
        signUpUseCase: SignUpUseCase,
        signOutUseCase: SignOutUseCase,
        tokenService: ITokenService){
        this.signInUseCase = signInUseCase
        this.signUpUseCase = signUpUseCase
        this.signOutUseCase = signOutUseCase
        this.tokenService = tokenService
    }

    public async signin(req: express.Request, res: express.Response){
        try{
           const { name,email , password, auth_type} = req.body
            return await this.signInUseCase.execute(name,email,auth_type, password).then((id:string)=>
            res.status(200).json({auth_token: this.tokenService.encode(id)}))
            .catch((err:Error)=> res.status(404).json({message: err}))
        }catch (err){
            res.status(404).json({message:err})

        }
    }

    public async signup(req: express.Request, res: express.Response){
        try{
           const { name, email , password, auth_type} = req.body
            return await this.signUpUseCase.execute(email,name,auth_type, password).then((id:string)=>
            res.status(200).json({auth_token: this.tokenService.encode(id)}))
            .catch((err:Error)=> res.status(404).json({message: err}))
        }catch (err){
            res.status(404).json({message:'err'})

        }
    }

    public async signout(req: express.Request, res: express.Response){
        try{
           const token = req.headers.authorization!
            return await this.signOutUseCase.execute(token).then((result)=>
            res.status(200).json({message: result}))
            .catch((err:Error)=> res.status(404).json({message: err}))
        }catch (err){
            res.status(404).json({message:'err'})

        }
    }

}