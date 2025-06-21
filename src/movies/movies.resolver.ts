import { Args, Query, Resolver } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { SearchMovieInput } from './dto/search-movie.input';
import { PaginatedMovies } from './dto/paginated-movies.dto';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => PaginatedMovies)
  async searchMovies(
    @Args('input', { type: () => SearchMovieInput, nullable: true }) input?: SearchMovieInput,
  ): Promise<PaginatedMovies> {
    return this.moviesService.searchMovies(input);
  }
}
