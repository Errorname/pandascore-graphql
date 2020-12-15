import { ObjectType, Query, Resolver } from 'type-graphql'

import { VideoGame, videogames } from './videogame'

@ObjectType({ implements: VideoGame })
export class RocketLeague extends VideoGame {}

@Resolver((of) => RocketLeague)
export class RocketLeagueResolver {
  @Query((returns) => RocketLeague)
  rocketleague() {
    return videogames.find((game) => game.__typename === 'RocketLeague')
  }
}
