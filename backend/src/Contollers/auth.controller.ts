import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/Services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/Models/user.model';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const user = await this.userService.create({ name, email, password });
    return { message: 'Signup successful', userId: (user as UserDocument)._id };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: (user as UserDocument)._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      token,
      user: {
        id: (user as UserDocument)._id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
