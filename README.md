# Callback server

## Description

This aplication server is made with [NestJS](https://nestjs.com) and provides a simple API server for a click to call application web app which uses an API from [FusionPBX](https://fusionpbx.com).

## Requirements

- API Enabled server at Fusionpbx
- Node installed in a machine
- MongoDB Server Database (I will provide a Docker ready to use setup for deployment in the early future)

## Installation

```bash
$ yarn install
```

## Environment

Under the environment folder you will find the samples for your env files.

To use `.env.development` environments export NODE_ENV=development variable in your operating system, or use the cross-env which is installed in the dev dependencies of this project. To use it just run the following command before your development process:

`$ npx cross_env NODE_ENV=production ... # that will point to your .env.production env file`

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Contact information

- Author - [Ruslan Gonzalez](https://rusgunx.tk)
- Twitter - [@ruslangonzalez](https://twitter.com/ruslangonzalez)

## License

This application is [MIT licensed](LICENSE).
