import  mongoose from "mongoose";
import redis from "redis";
import AuthRepository from "./auth/data/repository/AuthRepository";
import BcryptPasswordService from "./auth/data/services/BcryptPasswordService";
import JwtTokenService from "./auth/data/services/JwtTokenService";
import RedisTokenStore from "./auth/data/services/RedisTokenStore";
import AuthRouter from "./auth/entrypoint/AuthRouter";
import TokenValidation from "./auth/helpers/TokenValidation";
import CarRepository from "./cars_rent/data/repository/CarRepository";
import CarsRentRepository from "./cars_rent/data/repository/CarsRentRepository";
import CarRentRouter from "./cars_rent/entrypoint/CarRentRouter";
import CarRouter from "./cars_rent/entrypoint/CarRouter";

export default class CompositionRoot{
    private static client: mongoose.Mongoose
    private static redisClient: redis.RedisClient

    public static configure(){
        this.client = new mongoose.Mongoose()
        this.redisClient = redis.createClient()
        const connectionURI = encodeURI(process.env.TEST_DB as string)
        this.client.connect(connectionURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
          })
    }

    public static authRouter(){
        const authRepository = new AuthRepository(this.client)
        const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string)
        const passwordService = new BcryptPasswordService()
        const redisTokenStore = new RedisTokenStore(this.redisClient)
        const tokenValidator= new TokenValidation(tokenService,redisTokenStore)
        
        return AuthRouter.configure(authRepository, tokenService, redisTokenStore,passwordService, tokenValidator)
    }

    public static carRentRouter(){
        const carRentRepository = new CarsRentRepository(this.client)
        const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string)
        const redisTokenStore = new RedisTokenStore(this.redisClient)
        const tokenValidator = new TokenValidation(tokenService, redisTokenStore)

        return CarRentRouter.configure(carRentRepository, tokenValidator)
    }

    public static carRouter(){
        const carRepository = new CarRepository(this.client)
        const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string)
        const redisTokenStore = new RedisTokenStore(this.redisClient)
        const tokenValidator = new TokenValidation(tokenService, redisTokenStore)

        return CarRouter.configure(carRepository, tokenValidator)
    }
}