import { ObjectType, Query, Resolver } from 'type-graphql'

import { VideoGame, videogames } from './videogame'

@ObjectType({ implements: VideoGame })
export class Fifa extends VideoGame {}

@Resolver((of) => Fifa)
export class FifaResolver {
  @Query((returns) => Fifa)
  fifa() {
    return videogames.find((game) => game.__typename === 'Fifa')
  }
}
