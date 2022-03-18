import TokenValidation from "../../auth/helpers/TokenValidation";
import * as express from "express"
import CarRentController from "./CarRentController";
import ICarsRentRepository from "../domain/ICarsRentRepository";
export default class CarRentRouter{
    public static configure(
        repository: ICarsRentRepository,
        tokenValidator: TokenValidation
    ) : express.Router{
        const router = express.Router()
        let controller = new CarRentController(repository)

        router.get(
            '/',
            (req: express.Request, res: express.Response, next:express.NextFunction)=>
            tokenValidator.validate(req, res, next),
            (req: express.Request, res:express.Response)=>
            controller.findAll(req,res)
        )

        router.get(
            '/carsRent/:id',
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