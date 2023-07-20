import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';

@Injectable()
export class SessionService {
  private readonly redisClient: any;

  constructor() {
    // Replace the following options with your Redis configuration
    const redisOptions = {
      host: 'my_redis',
      port: 6379,
      //password: 'your_redis_password', // Optional: Uncomment if your Redis server requires authentication
    };

    // Create a new Redis client
    this.redisClient = redis.createClient(redisOptions);

    // Set up the session store using connect-redis
    const RedisStore = connectRedis(session);
    const sessionOptions = {
      store: new RedisStore({ client: this.redisClient }),
      secret: 'your_session_secret', // Replace with your own secret
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set to true if using HTTPS
    };

    // Initialize session middleware
    this.sessionMiddleware = session(sessionOptions);
  }

  public getSessionMiddleware(): NestMiddleware {
    return this.sessionMiddleware;
  }
}