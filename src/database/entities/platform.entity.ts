import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('platforms')
export class Platform {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 512 })
  uri: string;
}
