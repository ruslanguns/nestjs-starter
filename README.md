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
- [x] Package @nestjs/mongoose integration
- [ ] Testings
- [ ] Package @nestjs/bull integration
- [ ] Authentication with Passport Local Strategy
- [ ] Authentication with Passport JWT Strategy
- [ ] OTP -One Time Password-
- [ ] IN PROGRESS!

## Requirements

- Node installed in a machine
- MongoDB Server Database (I will provide a Docker ready to use setup for deployment in the early future) **OPTIONAL**

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
