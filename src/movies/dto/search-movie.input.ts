import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class SearchMovieInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => [String], { nullable: true })
  keywords?: string[];

  @Field(() => Int, { nullable: true })
  startingPosition?: number;

  @Field(() => Int, { nullable: true })
  offset?: number;
}
