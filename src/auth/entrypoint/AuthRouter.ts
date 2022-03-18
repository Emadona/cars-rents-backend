import * as express from 'express'
import IAuthRepository from '../domain/IAuthRepository';
import TokenValidation from '../helpers/TokenValidation';
import { signupValidationRules, validate } from '../helpers/Validators';
import IPasswordService from '../services/IPasswordService';
import ITokenService from '../services/ITokenService';
import ITokenStore from '../services/ITokenStore';
import SignInUseCase from '../usecases/SignInUseCase';
import SignOutUseCase from '../usecases/SignOutUseCase';
import SignUpUseCase from '../usecases/SignUpUseCase';
import AuthController from './AuthController';
export default class AuthRouter{
    public static configure(
        authRepository: IAuthRepository,
        tokenService: ITokenService,
        tokenStore: ITokenStore,
        passwordService: IPasswordService,
        tokenValidator: TokenValidation 
    ): express.Router{
        const router = express.Router()
        let controller = AuthRouter.composeRouter(
            authRepository,
            tokenService,
            tokenStore,
            passwordService
        )

        router.post('/signin',(req: express.Request, res: express.Response)=> controller.signin(req, res))
        router.post('/signout',(req:express.Request, res:express.Response, next:express.NextFunction) =>
        tokenValidator.validate(req, res, next),
        (req: express.Request, res: express.Response)=> controller.signout(req, res))
        router.post('/signup',
        signupValidationRules(),
        validate,
        (req: express.Request, res: express.Response)=> controller.signup(req, res))
        return router
    }

    public static composeRouter(
        authRepository: IAuthRepository,
        tokenService: ITokenService,
        tokenStore: ITokenStore,
        passwordService: IPasswordService
    ): AuthController{
        const signInUseCase = new SignInUseCase(authRepository,passwordService)
        const signUpUseCase = new SignUpUseCase(authRepository, passwordService)
        const signOutUseCase = new SignOutUseCase(tokenStore)
        const controller = new AuthController(signInUseCase, signUpUseCase,signOutUseCase,tokenService)
        return controller
    }
}