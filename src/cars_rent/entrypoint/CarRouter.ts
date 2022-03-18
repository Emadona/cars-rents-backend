import * as express from 'express'
import TokenValidation from '../../auth/helpers/TokenValidation'
import ICarRepository from '../domain/ICarRepository'
import CarController from './CarController'
export default class CarRouter{
    public static configure(
        repository: ICarRepository,
        tokenValidator: TokenValidation
    ) : express.Router{
        const router = express.Router()
        let controller = new CarController(repository)

        router.get(
            '/',
            (req: express.Request, res: express.Response, next:express.NextFunction)=>
            tokenValidator.validate(req, res, next),
            (req: express.Request, res:express.Response)=>
            controller.findAll(req,res)
        )

        router.get(
            '/cars/:id',
            (req: express.Request, res: express.Response, next:express.NextFunction)=>
            tokenValidator.validate(req, res, next),
            (req: express.Request, res:express.Response)=>
            controller.findOne(req,res)
        )

        router.get(
            '/location',
            (req: express.Request, res: express.Response, next:express.NextFunction)=>
            tokenValidator.validate(req, res, next),
            (req: express.Request, res:express.Response)=>
            controller.findByLocation(req,res)
        )

        router.get(
            '/search',
            (req: express.Request, res: express.Response, next:express.NextFunction)=>
            tokenValidator.validate(req, res, next),
            (req: express.Request, res:express.Response)=>
            controller.search(req,res)
        )

        return router
    }
}