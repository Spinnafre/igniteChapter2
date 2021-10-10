import { AppErrors } from './../../../errors/AppErrors';
import { Request, Response, NextFunction } from 'express';
import redis from 'redis'
import {RateLimiterRedis} from 'rate-limiter-flexible'

export default async function rateLimiter(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const redisClient = redis.createClient({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    });

    const rateLimiter = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: 'rateLimiter',
        points:5, // 5 requests
        duration: 5, // per 5 second by IP
    });

    try {
        await rateLimiter.consume(req.ip)
        return next()
    } catch (error) {
        throw new AppErrors('Too many request',429)
    }
}