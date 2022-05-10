import { Body, Controller, Post } from '@nestjs/common';
import { CompteService } from './services/compte.service';
import { Compte } from './entities/compte.entity';
import { login } from './model/login.model';
import { AuthService } from './services/auth.service';
import { CompteModel } from './model/compte.model';

@Controller('users')
export class CompteController {
  constructor(
    private readonly compteService: CompteService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  register(@Body() compte: CompteModel): boolean {
    this.compteService.insert(compte).then((r) => console.log(r));
    return true;
  }

  @Post('/login')
  async login(@Body() login: login) {

    let token;
    try {
      token = await this.authService.auth(login);
      return token;
    } catch (e) {
      return e;
    }

  }
}
