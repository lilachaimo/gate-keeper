import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('status')
  async getSessionStatus(@Req() req: Request): Promise<any> {
    const userId = 'user:' + req.ip; // You can use a more reliable identifier for user identification
    const isActive = await this.sessionService.isUserActive(userId);

    return { active: isActive };
  }

  @Post('login')
  async loginUser(@Req() req: Request, @Res() res: Response, @Body('username') username: string, @Body('password') password: string): Promise<any> {
    // Replace this with your actual login logic (e.g., check user credentials in the database)
    const isValidCredentials = username === 'your_username' && password === 'your_password';

    if (isValidCredentials) {
      const userId = 'user:' + req.ip; // You can use a more reliable identifier for user identification

      // Log the user in and set their session as active
      await this.sessionService.setActiveUser(userId);
      return res.json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  @Post('logout')
  async logoutUser(@Req() req: Request, @Res() res: Response): Promise<any> {
    const userId = 'user:' + req.ip; // You can use a more reliable identifier for user identification

    // Log the user out and set their session as inactive
    await this.sessionService.setInactiveUser(userId);
    return res.json({ message: 'Logout successful' });
  }
}
