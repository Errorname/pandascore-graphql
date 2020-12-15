import {
  Args,
  ArgsType,
  createUnionType,
  Ctx,
  Field,
  ID,
  Int,
  ObjectType,
  Query,
  registerEnumType,
  Resolver,
} from 'type-graphql'
import upperFirst from 'lodash/upperFirst'

import { Context } from '../context'
import { fetch } from '../api'

import { League } from './league'
import { Match } from './match'
import { Player } from './player'
import { Serie } from './serie'
import { Team } from './team'
import { Tournament } from './tournament'
import { Max, Min } from 'class-validator'

enum IncidentChangeType {
  creation = 'creation',
  deletion = 'deletion',
  update = 'update',
}

registerEnumType(IncidentChangeType, { name: 'IncidentChangeType' })

enum IncidentType {
  league = 'league',
  serie = 'serie',
  tournament = 'tournament',
  match = 'match',
  team = 'team',
  player = 'player',
}

registerEnumType(IncidentType, { name: 'IncidentType' })

@ObjectType()
export class DeletionObject {
  @Field()
  deleted_at: string

  @Field()
  reason: string

  @Field((type) => ID)
  videogame_id: number
}

const IncidentObject = createUnionType({
  name: 'IncidentObject',
  types: () => [League, Serie, Tournament, Match, Team, Player, DeletionObject] as const,
  resolveType: (value) => {
    // @ts-ignore
    if (value.reason) {
      return 'DeletionObject'
    }
    // @ts-ignore
    return value.__typename
  },
})

@ObjectType()
export class Incident {
  @Field((type) => IncidentChangeType)
  change_type: IncidentChangeType

  @Field((type) => ID)
  id: number

  @Field()
  modified_at: string

  @Field((type) => IncidentObject)
  object: typeof IncidentObject

  @Field((type) => IncidentType)
  type: IncidentType
}

@ArgsType()
export class IncidentsArgs {
  @Field((type) => Int, { nullable: true })
  @Min(1)
  page: number

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(100)
  per_page: number

  @Field((type) => String, { nullable: true })
  since: string

  @Field((type) => IncidentType, { nullable: true })
  type: IncidentType

  @Field((type) => [ID], { nullable: true })
  videogame: number[]

  @Field((type) => IncidentChangeType, { nullable: true })
  change_type: IncidentChangeType
}

@Resolver((of) => Incident)
export class IncidentResolver {
  @Query((returns) => [Incident])
  incidents(@Args() { change_type, ...params }: IncidentsArgs, @Ctx() ctx: Context) {
    const url = {
      creation: 'additions',
      update: 'changes',
      deletion: 'deletions',
    }[change_type]
    return fetch(ctx)(`/${url || 'incidents'}`, params).then((incidents: Incident[]) =>
      incidents.map((incident) => {
        // @ts-ignore
        incident.object.__typename = upperFirst(incident.type)
        return incident
      })
    )
  }
}
