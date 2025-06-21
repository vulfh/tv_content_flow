import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from '../entities/movie.entity';

@ObjectType()
export class PaginatedMovies {
  @Field(() => [Movie])
  items: Movie[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  startingPosition: number;

  @Field(() => Int)
  offset: number;
}
