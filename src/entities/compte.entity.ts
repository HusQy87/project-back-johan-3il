import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Compte extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_compte: number;

  @Column()
  pseudo: string;

  @Column()
  email: string;

  @Column()
  mdp: string;

}
