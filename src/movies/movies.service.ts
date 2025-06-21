import { Injectable } from '@nestjs/common';
import { SearchMovieInput } from './dto/search-movie.input';
import { PaginatedMovies } from './dto/paginated-movies.dto';
import { SearchMoviesUseCase } from './use-cases/search-movies.use-case';

@Injectable()
export class MoviesService {
  constructor(private readonly searchMoviesUseCase: SearchMoviesUseCase) {}

  async searchMovies(input: SearchMovieInput): Promise<PaginatedMovies> {
    return this.searchMoviesUseCase.execute(input);
  }
}
