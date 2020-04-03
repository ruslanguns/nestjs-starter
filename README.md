# NestJs Starter

## in progress

## Description

This aplication server is made with [NestJS](https://nestjs.com) and provides a scaffold with a kit of tools and utils to reduce the boilerplate when you are starting a new backend project.

## Features

- [x] Clean architecture
- [x] Interceptors for logging and formating
- [x] Filters for error logging handling
- [x] Tested collection of utils
- [x] Package @nestjs/config integration with some extra tricks
- [x] Package @nestjs-modules/mailer integration
- [x] Package @nestjs/scheduler integration
- [x] Package @nestjs/typeorm integration
- [ ] Testings
- [ ] Package @nestjs/bull integration
- [x] Authentication with Passport Local Strategy
- [x] Authentication with Passport JWT Strategy
- [ ] OTP -One Time Password-
- [ ] IN PROGRESS!

## Requirements

- Node installed in a machine
- Postgres Server Database (I will provide a Docker ready to use setup for deployment in the early future) follow [these instructions](#instruction-to-use-docker-for-database) to setup DB with Docker.**OPTIONAL**

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

## Instruction to use Docker for Database


Build image in background and run with logs:

```bash
docker-compose -f database.yml up
```

Build image in background and run in the first time:

```bash
docker-compose -f database.yml up -d
```

To stop container:

```bash
docker-compose -f database.yml stop
```

To start container:

```bash
docker-compose -f database.yml stop
```

To remove and prune:

```bash
docker-compose -f database.yml stop
docker-compose -f database.yml rm # followed by "y"
docker-compose -f database.yml down
docker-compose -f database.yml down --volumes
```



## Contact information

- Author - [Ruslan Gonzalez](https://rusgunx.tk)
- Twitter - [@ruslangonzalez](https://twitter.com/ruslangonzalez)

## License

This application is [MIT licensed](LICENSE).
