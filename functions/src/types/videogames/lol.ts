import { ObjectType, Query, Resolver } from 'type-graphql'

import { VideoGame, videogames } from './videogame'

@ObjectType({ implements: VideoGame })
export class Lol extends VideoGame {}

@Resolver((of) => Lol)
export class LolResolver {
  @Query((returns) => Lol)
  lol() {
    return videogames.find((game) => game.__typename === 'Lol')
  }
}
