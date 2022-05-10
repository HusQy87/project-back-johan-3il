import { Injectable } from '@nestjs/common';
import { login } from '../model/login.model';
import { CompteService } from './compte.service';
import * as bcrypt from 'bcrypt';
import { Compte } from '../entities/compte.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly compteService: CompteService,
    private jwtService: JwtService,
  ) {}
  async auth(login: login) {
    const user = await this.compteService.compteRepository.findOne({
      pseudo: login.pseudo,
    });
    if (user instanceof Compte) {
      console.log(login.mdp, user);
      const goodPasword = bcrypt.compare(login.mdp, user.mdp);
      if (goodPasword) {
        return this.jwtService.sign({
          pseudo: user.pseudo,
          id: user.id_compte,
        });
      } else {
        throw `le mot de passe ne correspond pas au pseudo ${login.pseudo}`;
      }
    } else {
      throw `pas de compte pour le pseudo ${login.pseudo}`;
    }
  }
}
