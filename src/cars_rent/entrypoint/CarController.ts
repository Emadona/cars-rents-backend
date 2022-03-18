import * as express from 'express'
import ICarRepository from "../domain/ICarRepository";
import { Location } from '../domain/Location';

export default class CarController{
    constructor(private readonly repository: ICarRepository){}

    public async findAll(req:express.Request, res: express.Response){
        try{
            const {page, limit} = {...req.query} as {page:any, limit:any}
            return this.repository
            .findAll(parseInt(page), parseInt(limit))
            .then((pageable)=>
            res.status(200).json({
                'metadata':{
                    page:pageable.page,
                    pageSize: pageable.pageSize,
                    total_pages: pageable.totalPages
                },
                carRent: pageable.data
            })
            )
            .catch((err: Error)=> res.status(400).json({err: err}))
        }catch(err){
            return res.status(400).json({err: err})
        }
    }

    public async findOne(req:express.Request, res: express.Response){
        try{
            const { id } = req.params
            return this.repository
            .findOne(id)
            .then((CarRent)=>
            res.status(200).json(CarRent))
            .catch((err:Error)=> res.status(400).json({err:err}))
        } catch(err) {
            return res.status(400).json({err:err})
        }
    }

    public async findByLocation(req: express.Request, res: express.Response){
        try{
            const {page, limit, longitude, latitude} = {...req.query} as {
                page:any, 
                limit:any,
                longitude: string,
                latitude: string}
            const location = new Location(parseInt(longitude), parseInt(latitude))
            return this.repository
            .findByLocation(location,
            parseInt(page), parseInt(limit))
            .then((pageable)=>
            res.status(200).json({
                'metadata':{
                    page:pageable.page,
                    pageSize: pageable.pageSize,
                    total_pages: pageable.totalPages
                },
                carRent: pageable.data
            })
            )
            .catch((err: Error)=> res.status(400).json({error: err}))
        }catch(err){
            return res.status(400).json({err:err})
        }
    }

    public async search(req: express.Request, res: express.Response){
        try{
            const {page, limit, query} = {...req.query} as {
                page:string, 
                limit:string,
                query: string}
            return this.repository
            .search(parseInt(page), parseInt(limit), query)
            .then((pageable)=>
            res.status(200).json({
                'metadata':{
                    page:pageable.page,
                    pageSize: pageable.pageSize,
                    total_pages: pageable.totalPages
                },
                carRent: pageable.data
            })
            )
            .catch((err: Error)=> res.status(400).json({err: err}))
        }catch(err){
            return res.status(400).json({err:err})
        }
    }
}