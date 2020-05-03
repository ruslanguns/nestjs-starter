# NestJs Starter

![badge](https://github.com/ruslanguns/nestjs-starter/workflows/CI/badge.svg)

This aplication server is made with [NestJS](https://nestjs.com) and provides a scaffold with a kit of tools and utils to reduce the boilerplate when you are starting a new backend project.

## Roadmap

- [x] IN PROGRESS!
- [x] Clean architecture
- [x] Interceptors for logging and formating the output message DataOutput interface
- [x] Filters for error logging handling
- [x] Tested collection of utils
- [x] Security - Helmet
- [x] Security - Cors
- [x] Security - Rate limit
- [x] Performance - Compress
- [ ] Performance - Caching
- [x] Package @nestjs-modules/mailer for Mail integration
- [x] Package @nestjs/config integration with some extra tricks
- [x] Package @nestjs-modules/mailer integration
- [x] Package @nestjs/scheduler integration for scheduled tasks
- [x] Package @nestjs/typeorm integration
- [ ] Package @nestjs/bull integration for queues
- [ ] Package @ogma/logger integration for awesome logger
- [x] Model / Entities Abstractions
- [x] Authentication with Passport Local Strategy
- [x] Authentication with Passport JWT Strategy
- [ ] Authentication with Passport Google Strategy
- [ ] Authentication with Passport Facebook Strategy
- [ ] Authentication with Passport Twitter Strategy
- [ ] Authentication with Passport Github Strategy
- [ ] Files feature API Enpoint
- [ ] Files metadata API Enpoint Plus
- [x] User feature API Enpoint
- [x] Docs User feature API Enpoint
- [x] User information/metadata/addresses/phones API Enpoint
- [ ] Docs User information/metadata/addresses/phones API Enpoint
- [ ] Unit / Integration Testings - In progress
- [ ] E2E Testings
- [ ] Cypress Integration for e2e testings
- [ ] OTP -One Time Password
- [ ] Deploy with zeit now - In progress
- [x] Deploy with Docker - [See here instructions](#deploy-with-docker-instructions)

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

`$ npx cross_env NODE-ENV=production ... # that will point to your .env.production env file`

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

To remove and prune/clean:

```bash
docker-compose -f database.yml stop
docker-compose -f database.yml rm # followed by "y"
docker-compose -f database.yml down
docker-compose -f database.yml down --volumes
```

## Deploy with docker instructions

If run for the first time you need to run the quick script for building the image and running for the first time:

```bash
yarn deploy:docker:build
```

Then to stop you need to run:

```bash
yarn deploy:docker:stop
```

To start an already builded & stoped image:

```bash
yarn deploy:docker:start
```

To debug:

```bash
yarn deploy:docker:debug
```

If you make changes in the code then you need to rebuild the image, make sure you have stoped its containers first and then run:

```bash
yarn deploy:docker:rebuild
```

Then you should recreate the containers in order to get the latest image changes.

```bash
yarn deploy:docker:recreate
```

And that's it!

To remove and prune/clean:

```bash
docker-compose -f deploy.yml stop
docker-compose -f deploy.yml rm # followed by "y"
docker-compose -f deploy.yml down
docker-compose -f deploy.yml down --volumes
```

## Contact information

- Author - [Ruslan Gonzalez](https://rusgunx.tk)
- Twitter - [@ruslangonzalez](https://twitter.com/ruslangonzalez)

## License

This application is [MIT licensed](LICENSE).
