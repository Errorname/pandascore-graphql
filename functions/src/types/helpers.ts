import { Max, Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { nullable: true })
  @Min(1)
  page: number

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  per_page: number
}
