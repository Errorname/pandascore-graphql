import { ObjectType, Query, Resolver } from 'type-graphql'

import { VideoGame, videogames } from './videogame'

@ObjectType({ implements: VideoGame })
export class Pubg extends VideoGame {}

@Resolver((of) => Pubg)
export class PubgResolver {
  @Query((returns) => Pubg)
  pubg() {
    return videogames.find((game) => game.__typename === 'Pubg')
  }
}
