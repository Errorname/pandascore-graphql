import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import { OpponentType } from './opponent'

enum GameStatus {
  finished = 'finished',
  not_played = 'not_played',
  not_started = 'not_started',
  running = 'running',
}

registerEnumType(GameStatus, { name: 'GameStatus' })

@ObjectType()
export class Game {
  @Field({ nullable: true })
  begin_at: string

  @Field({ nullable: true })
  complete: boolean

  @Field({ nullable: true })
  detailed_stats: boolean

  @Field({ nullable: true })
  end_at: string

  @Field({ nullable: true })
  finished: boolean

  @Field({ nullable: true })
  forfeit: boolean

  @Field((type) => ID, { nullable: true })
  id: number

  @Field({ nullable: true })
  length: number

  @Field({ nullable: true })
  position: number

  @Field((type) => GameStatus, { nullable: true })
  status: GameStatus

  @Field({ nullable: true })
  video_url: string

  @Field((type) => ID, { nullable: true })
  winner_id: number

  @Field((type) => OpponentType, { nullable: true })
  winner_type: OpponentType
}
