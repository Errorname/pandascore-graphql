import { ObjectType, Query, Resolver } from 'type-graphql'

import { VideoGame, videogames } from './videogame'

@ObjectType({ implements: VideoGame })
export class Overwatch extends VideoGame {}

@Resolver((of) => Overwatch)
export class OverwatchResolver {
  @Query((returns) => Overwatch)
  overwatch() {
    return videogames.find((game) => game.__typename === 'Overwatch')
  }
}
