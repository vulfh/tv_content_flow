import { Injectable } from '@nestjs/common';
import { MoviesRepository } from '../repositories/movies.repository.interface';
import { SearchMovieInput } from '../dto/search-movie.input';
import { PaginatedMovies } from '../dto/paginated-movies.dto';

@Injectable()
export class SearchMoviesUseCase {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(input: SearchMovieInput): Promise<PaginatedMovies> {
    return this.moviesRepository.searchMovies(input);
  }
}
