import { Module } from '@nestjs/common';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';
import { MoviesElasticsearchRepository } from './repositories/movies.elasticsearch.repository';
import { SearchMoviesUseCase } from './use-cases/search-movies.use-case';
import { ElasticsearchConfigModule } from '../config/elasticsearch.module';
import { MOVIES_REPOSITORY } from './movies.repository.token';

@Module({
  imports: [ElasticsearchConfigModule],
  providers: [
    MoviesResolver,
    MoviesService,
    SearchMoviesUseCase,
    {
      provide: MOVIES_REPOSITORY,
      useClass: MoviesElasticsearchRepository,
    },
  ],
})
export class MoviesModule {}
