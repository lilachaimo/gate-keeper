import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class UserActivityMiddleware implements NestMiddleware {
  private readonly redisClient: any;



  async use(req: Request, res: Response, next: NextFunction) {
    const userId = 'user:' + req.ip; // You can use a more reliable identifier for user identification
    const lastActivityTimestamp = await this.getLastActivityTimestamp(userId);
    const currentTimestamp = Date.now();

    // Check if the user has been inactive for more than one hour
    if (currentTimestamp - lastActivityTimestamp > 60 * 60 * 1000) {
      // Set the flag to indicate the user is inactive
      await this.setInactiveFlag(userId);

      // Block the user for 5 minutes
      return res.status(403).json({ message: 'You are blocked for 5 minutes.' });
    }

    // Record the current timestamp as the last user activity
    await this.recordUserActivity(userId, currentTimestamp);

    // User is active, continue to the next middleware or route handler
    next();
  }

  private async getLastActivityTimestamp(userId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.redisClient.get(userId, (err, timestamp) => {
        if (err) {
          reject(err);
        } else {
          resolve(parseInt(timestamp) || 0);
        }
      });
    });
  }

  private async setInactiveFlag(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Set the user inactive flag with a 5-minute expiration time
      this.redisClient.setex(userId, 5 * 60, 'inactive', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  private async recordUserActivity(userId: string, timestamp: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.redisClient.set(userId, timestamp.toString(), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
