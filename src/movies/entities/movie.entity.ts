import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  type: string; // movie or series

  @Field()
  genre: string;

  @Field()
  country: string;

  @Field(() => [String])
  keywords: string[];

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  rating?: number;

  @Field({ nullable: true })
  releaseYear?: number;

  @Field(() => [String], { nullable: true })
  platforms?: string[]; // where it can be watched
}
