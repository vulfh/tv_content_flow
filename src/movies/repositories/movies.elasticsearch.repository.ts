import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository.interface';
import { Movie } from '../entities/movie.entity';
import { SearchMovieInput } from '../dto/search-movie.input';
import { PaginatedMovies } from '../dto/paginated-movies.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class MoviesElasticsearchRepository implements MoviesRepository {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async searchMovies(input: SearchMovieInput): Promise<PaginatedMovies> {
    const { title, genre, country, type, keywords, startingPosition, offset } = input;
    const from = startingPosition;

    const searchBody: Record<string, any> = {
      index: 'movies',
      from,
      size: offset,
      query: {
        bool: {
          must: [
            ...(title ? [{ match: { title } }] : []),
            ...(genre ? [{ match: { genre } }] : []),
            ...(country ? [{ match: { country } }] : []),
            ...(type ? [{ term: { type } }] : []),
            ...(keywords?.length ? [{ terms: { keywords } }] : []),
          ],
        },
      },
    };

    const response = await this.elasticsearchService.search<Partial<Movie>>({
      index: 'movies',
      body: searchBody,
    });

    const movies = response.hits.hits.map(hit => ({
      id: hit._id,
      title: hit._source.title,
      type: hit._source.type,
      genre: hit._source.genre,
      country: hit._source.country,
      keywords: hit._source.keywords,
      description: hit._source.description,
      rating: hit._source.rating,
      releaseYear: hit._source.releaseYear,
      platforms: hit._source.platforms,
    }));

    const total = typeof response.hits.total === 'number' 
      ? response.hits.total 
      : response.hits.total.value;

    return {
      items: movies,
      totalCount: total,
      startingPosition: from,
      offset,
    };
  }
}
