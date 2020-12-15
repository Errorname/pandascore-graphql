window.defaultQueries = {
  'LoL Worlds 2020 Winners': `query {
    lol {
      leagues(search: { name: "Worlds" }) {
        id
        name
        series(range: { begin_at: ["2020-01-01", "2020-12-31"] }) {
          id
          tournaments(filter: { name: "Playoffs" }) {
            id
            name
            matches(search: { name: "Final" }, per_page: 1) {
              id
              name
              winner {
                ... on Team {
                  acronym
                  name
                  players {
                    name
                    role
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `,
  'Available videogames': `query {
  videogames {
    id
    name
  }
}`,
  'Upcoming matches': `query {
  upcomingMatches {
    id
    begin_at
    videogame {
      name
    }
    opponents_type
    opponents {
      ... on Player {
        name
      }
      ... on Team {
        acronym
        name
      }
    }
  }
}`,
}
