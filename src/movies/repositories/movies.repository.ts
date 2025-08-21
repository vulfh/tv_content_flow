import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository.interface';
import { Movie } from '../entities/movie.entity';
import { SearchMovieInput } from '../dto/search-movie.input';
import { PaginatedMovies } from '../dto/paginated-movies.dto';

@Injectable()
export class MoviesRepositoryImpl implements MoviesRepository {
  private readonly movies: Movie[] = [
    {
      id: '1',
      title: 'The Matrix',
      genre: 'Action, Sci-Fi',
      country: 'USA',
      type: 'Movie',
      keywords: ['action', 'matrix', 'neo', 'cyberpunk'],
      releaseDate: new Date('1999-03-31'),
    },
    {
      id: '2',
      title: 'Inception',
      genre: 'Sci-Fi, Thriller',
      country: 'USA',
      type: 'Movie',
      keywords: ['dream', 'inception', 'nolan', 'action'],
      releaseDate: new Date('2010-07-16'),
    },
    {
      id: '3',
      title: 'The Godfather',
      genre: 'Crime, Drama',
      country: 'USA',
      type: 'Movie',
      keywords: ['crime', 'godfather', 'mafia', 'drama'],
      releaseDate: new Date('1972-03-24'),
    },
    {
      id: '4',
      title: 'Pulp Fiction',
      genre: 'Crime, Drama',
      country: 'USA',
      type: 'Movie',
      keywords: ['crime', 'tarantino', 'fiction', 'drama'],
      releaseDate: new Date('1994-10-14'),
    },
    {
      id: '5',
      title: 'The Dark Knight',
      genre: 'Action, Crime',
      country: 'USA',
      type: 'Movie',
      keywords: ['batman', 'dark', 'nolan', 'action'],
      releaseDate: new Date('2008-07-18'),
    },
  ];

  async searchMovies(input: SearchMovieInput): Promise<PaginatedMovies> {
    let filteredMovies = [...this.movies];

    // Apply search filters
    if (input.title) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(input.title.toLowerCase())
      );
    }

    if (input.genre) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.genre.toLowerCase().includes(input.genre.toLowerCase())
      );
    }

    if (input.country) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.country.toLowerCase().includes(input.country.toLowerCase())
      );
    }

    if (input.type) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.type.toLowerCase().includes(input.type.toLowerCase())
      );
    }

    if (input.keywords?.length > 0) {
      filteredMovies = filteredMovies.filter(movie =>
        input.keywords.some(keyword =>
          movie.keywords?.some(mk => mk.toLowerCase().includes(keyword.toLowerCase()))
        )
      );
    }

    // Apply pagination
    const startingPosition = input.startingPosition || 0;
    const offset = input.offset || 10;
    const items = filteredMovies.slice(startingPosition, startingPosition + offset);

    return {
      items,
      totalCount: filteredMovies.length,
      startingPosition,
      offset,
    };
  }
}
