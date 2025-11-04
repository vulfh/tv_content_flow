import { Inject, Injectable } from '@nestjs/common';
import type { MoviesRepository } from '../repositories/movies.repository.interface';
import { SearchMovieInput } from '../dto/search-movie.input';
import { PaginatedMovies } from '../dto/paginated-movies.dto';
import { MOVIES_REPOSITORY } from '../movies.repository.token';

@Injectable()
export class SearchMoviesUseCase {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: MoviesRepository,
  ) {}

  async execute(input: SearchMovieInput): Promise<PaginatedMovies> {
    return this.moviesRepository.searchMovies(input);
  }
}
