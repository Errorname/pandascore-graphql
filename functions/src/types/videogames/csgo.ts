import { ObjectType, Query, Resolver } from 'type-graphql'

import { VideoGame, videogames } from './videogame'

@ObjectType({ implements: VideoGame })
export class Csgo extends VideoGame {}

@Resolver((of) => Csgo)
export class CsgoResolver {
  @Query((returns) => Csgo)
  csgo() {
    return videogames.find((game) => game.__typename === 'Csgo')
  }
}
