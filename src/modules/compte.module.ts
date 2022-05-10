import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compte } from '../entities/compte.entity';
import { CompteService } from '../services/compte.service';
import { CompteController } from '../compte.controller';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compte]),
    JwtModule.register({
      secret: 'tagrandmerelapute',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [CompteService, AuthService],
  controllers: [CompteController],
})
export class UsersModule {}
