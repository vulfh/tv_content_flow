import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import elasticsearchConfig from './elasticsearch.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [elasticsearchConfig],
    }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get<string>('elasticsearch.node'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [ElasticsearchModule],
})
export class ElasticsearchConfigModule {}
