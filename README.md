# War

## Introduction
This is a TypeScript application that simulates the classic card game of War. The application provides two endpoints:

- `/game` - This endpoint allows the client to start a new game of War. The game logic is implemented in `game.ts`.
- `/wins` - This endpoint returns the lifetime wins of both players stored in a local Sqlite database.

The service is built using the Express.js framework and utilizes Sqlite as its database. The database is created as an on-disk file when the service is first run.

The application also includes Jest as its testing framework. Unit tests have been written for `game.ts`, while API tests for `index.ts` are still in development.

## Prerequisite

```
node >= v18.16.0
yarn >= 1.22.0
```

## Install and build

```
yarn
yarn build
```

## Run the server

```
yarn start
```
The server will run on localhost:3000

### Play the game / get player wins

Open another terminal, and navigate to the project folder
```
cd dist/client
node playGame # Start a game on the server, and it will return the winner.
node getWins # Get the lifetime wins of both players.
```

## Run the tests

```
yarn test
```

## Future work

Currently, the application stores only the lifetime wins in a local, on-disk database since this is a smaller scale project. However, for future development, I plan on considering utilizing a cloud database.

If given more time, I would like to store the game data as well so that the games can be replayed. Additionally, I plan on developing a user interface that shows the progress of the game, which will allow the client to better understand the game and its outcomes.
