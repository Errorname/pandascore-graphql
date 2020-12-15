import {
  Args,
  Ctx,
  Field,
  ID,
  Int,
  ObjectType,
  Query,
  registerEnumType,
  Resolver,
} from 'type-graphql'
import { fetch } from '../api'
import { Context } from '../context'
import { PaginationArgs } from './helpers'
import { Match } from './match'

enum LiveType {
  events = 'events',
  frames = 'frames',
}

registerEnumType(LiveType, { name: 'LiveType' })

@ObjectType()
class LiveEndpoint {
  @Field({ nullable: true })
  begin_at: string

  @Field({ nullable: true })
  expected_begin_at: string

  @Field((type) => Int, { nullable: true })
  last_active: number

  @Field((type) => ID)
  match_id: number

  @Field()
  open: boolean

  @Field()
  type: LiveType

  @Field()
  url: string
}

@ObjectType()
export class Live {
  @Field((type) => [LiveEndpoint])
  endpoints: LiveEndpoint[]

  @Field((type) => Match)
  match: Match
}

@Resolver((of) => Live)
export class LiveResolver {
  @Query((type) => [Live])
  lives(@Args() params: PaginationArgs, @Ctx() ctx: Context) {
    return fetch(ctx)('/lives', params)
  }
}
