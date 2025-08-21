import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('content_types')
export class ContentType {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;
}
