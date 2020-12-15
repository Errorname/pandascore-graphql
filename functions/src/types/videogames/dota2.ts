import { ObjectType, Query, Resolver } from 'type-graphql'

import { VideoGame, videogames } from './videogame'

@ObjectType({ implements: VideoGame })
export class Dota2 extends VideoGame {}

@Resolver((of) => Dota2)
export class Dota2Resolver {
  @Query((returns) => Dota2)
  dota2() {
    return videogames.find((game) => game.__typename === 'Dota2')
  }
}
