import { createUnionType, registerEnumType } from 'type-graphql'
import { Player } from './player'
import { Team } from './team'

export enum OpponentType {
  player = 'Player',
  team = 'Team',
}

registerEnumType(OpponentType, { name: 'OpponentType' })

export const Opponent = createUnionType({
  name: 'Opponent',
  types: () => [Team, Player] as const,
  resolveType: (value) => {
    if ('acronym' in value) {
      return Team
    }
    return Player
  },
})
