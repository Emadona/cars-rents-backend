import ITokenService from "../../services/ITokenService";
import Jwt from 'jsonwebtoken'
export default class JwtTokenService implements ITokenService{
    constructor(private readonly privateKey: string){}
    encode(payload: string | object): string | object {
        let token = Jwt.sign({data: payload}, this.privateKey,{
            issuer: 'com.car_rent',
            expiresIn: '1h'
        })
        return token
    }
    decode(token: string): string | object {
        try{
            const decoded = Jwt.verify(token, this.privateKey)
            return decoded
        } catch (err){
            return 'invalid token'
        }
    }

}