import { NextFunction, Request, Response } from "express";
import ITokenService from "../services/ITokenService";
import ITokenStore from "../services/ITokenStore";

export default class TokenValidation {
    constructor(private readonly tokenService: ITokenService, 
                private readonly tokenStore: ITokenStore){}

    public async validate(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization
        if(!authHeader) return res.status(404).json({'message': 'Authorization header required'})
        if (this.tokenService.decode(authHeader) === '' ||
        (await this.tokenStore.get(authHeader)!== '')) {
            return res.status(403).json({'message': 'Invalid token'})
        }
        next()
    }
}