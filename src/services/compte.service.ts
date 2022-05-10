import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compte } from '../entities/compte.entity';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {CompteModel} from "../model/compte.model";
@Injectable()
export class CompteService {
  constructor(
    private connection: Connection,
    @InjectRepository(Compte) public compteRepository: Repository<Compte>,
  ) {}

  async insert(compte: CompteModel): Promise<Compte> {
    const compteEntity: Compte = Compte.create();
    const { pseudo, email, mdp } = compte;
    compteEntity.email = email;
    compteEntity.mdp = await bcrypt.hash(mdp, 10);
    compteEntity.pseudo = pseudo;
    await compteEntity.save();
    return compteEntity;
  }
}
