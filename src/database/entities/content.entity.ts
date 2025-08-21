import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentType } from './content-type.entity';

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'int', name: 'content_type_id' })
  contentTypeId: number;

  @ManyToOne(() => ContentType, { nullable: false })
  @JoinColumn({ name: 'content_type_id' })
  contentType: ContentType;

  @Column({ type: 'text', nullable: true })
  description: string;
}
