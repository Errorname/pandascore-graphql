import { ObjectType, Query, Resolver } from 'type-graphql'

import { VideoGame, videogames } from './videogame'

@ObjectType({ implements: VideoGame })
export class R6Siege extends VideoGame {}

@Resolver((of) => R6Siege)
export class R6SiegeResolver {
  @Query((returns) => R6Siege)
  r6siege() {
    return videogames.find((game) => game.__typename === 'R6Siege')
  }
}
