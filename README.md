<p align="center"><img src="hosting/logo-white.png" width="700"/></p>

<h1 align="center">PandaScore x GraphQL</h1>

<p align="center">Proof-of-Concept of a GraphQL wrapper of the <a target="_blank" href="https://pandascore.co/">PandaScore</a> Esports API.</p>

This project uses [TypeGraphQL](https://typegraphql.com/) and [Apollo Server](https://www.apollographql.com/docs/apollo-server/), and it is hosted using [Firebase](https://firebase.google.com/).

I developed this project because I needed to wander through PandaScore's data, and found the REST API format to be quite inefficient.

> ⚠️ This project is **not** intended to be used in production and will probably **not** be maintained.

## Installation

```bash
cd functions && npm i
```

## Usage

```bash
# Build & watch
npm run build

# Start hosting & functions emulators
npm run start

# Deploy hosting & functions
npm run deploy
```
