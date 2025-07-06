import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/Contollers/auth.controller';
import { User, UserSchema } from 'src/Models/user.model';
import { UserService } from 'src/Services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret123',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [UserService],
  controllers: [AuthController],
  exports: [UserService],
})
export class UserModule {}
