import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Content } from './content.entity';
import { Platform } from './platform.entity';

@Entity('contents_on_platforms')
export class ContentPlatform {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', name: 'content_id' })
  contentId: number;

  @ManyToOne(() => Content, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column({ type: 'int', name: 'platform_id' })
  platformId: number;

  @ManyToOne(() => Platform, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'platform_id' })
  platform: Platform;

  @Column({ type: 'int', nullable: false })
  rank: number;
}
