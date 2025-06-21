import { Movie } from '../entities/movie.entity';
import { SearchMovieInput } from '../dto/search-movie.input';
import { PaginatedMovies } from '../dto/paginated-movies.dto';

export interface MoviesRepository {
  searchMovies(input: SearchMovieInput): Promise<PaginatedMovies>;
}
