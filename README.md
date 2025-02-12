# Book Search

## Description

Home Assignment

**Live preview:** [Book Search](https://book-search.tariqguesri.com/)

## Installing dependencies

This repo uses [Yarn](https://yarnpkg.com/), it is required because I'm using [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

```sh
yarn
```

## Usage

Before you run the project, make sure to create an `.env` file in `packages/server` (Or you can just copy the sample file in the config folder and rename it to config.env)

This is an example how the config file should look

```.env
# --------------------------------------------------
# Core
# --------------------------------------------------

NODE_ENV=production
PORT=5000
# NODE_PATH=./src ts-node ./src/server.ts
```

Make sure you also to crate an `env` file in `packages/client` as well

```.env
VITE_BACKEND_URL_DEV=http://localhost:5000/api
VITE_BACKEND_URL_PROD=https://book-search.tariqguesri.com/api
```

To run the project in development mode, run:

```sh
yarn start:dev
```

In order to run it in production mode, you need to build it first (In case you haven't built it already): 

```sh
yarn build
```

And then start the build with this:

```sh
yarn start
```


## Linting and Code Quality

To lint all files run:

```sh
yarn lint
```

