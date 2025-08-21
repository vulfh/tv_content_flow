import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  genre: string;

  @Field()
  country: string;

  @Field()
  type: string; // movie or series

  @Field(() => [String])
  keywords: string[];

  @Field()
  releaseDate: Date;



  @Field({ nullable: true })
  rating?: number;

  @Field(() => [String], { nullable: true })
  platforms?: string[]; // where it can be watched
}
