import { ObjectType, Query, Resolver } from 'type-graphql'

import { VideoGame, videogames } from './videogame'

@ObjectType({ implements: VideoGame })
export class CodMw extends VideoGame {}

@Resolver((of) => CodMw)
export class CodMwResolver {
  @Query((returns) => CodMw)
  codmw() {
    return videogames.find((game) => game.__typename === 'CodMw')
  }
}
