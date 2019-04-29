[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Getting Started

## Installation

```bash
$ npm install
```

## Configuration

### 1. Create environment variable `NODE_ENV`

```bash
$ export NODE_ENV=dev
```

### 2. Create a `.env` config file matching your environment name (e.g . `dev.env`)

```
SmartCar.CLIENT_ID="[...]"
SmartCar.CLIENT_SECRET="[...]"
SmartCar.REDIRECT_URL="https://....ngrok.io/smartcar/exchange"
SmartCar.TestMode=true

AWS.Region="us-west-1"
```

This config is used by `config.service.ts` and loaded in `config.module.ts`

### 3. Create tables in DynamoDB

| Table                 | Hash Key             | Sort Key        | Notes                                        |
| --------------------- | -------------------- | --------------- | -------------------------------------------- |
| `odo-vehicle`         | `vehicleId` (string) | N/A             | see `vehicle.entity.ts` for details          |
| `odo-odometerHistory` | `vehicleId` (string) | `date` (number) | see `odometer-history.entity.ts` for details |

### How SmartCar integration works

Smart Car SDK requires _client id_, _client secret_, and _redirect url_ for callbacks. These can be obtained from Smart Car dashboard when creating an application.

For debuging purposes, use [ngrok](https://ngrok.com/) to open access for Smart Car backend to your local web server.

### How AWS is configured

This package relies on [AWS CLI](https://aws.amazon.com/cli/) credentials stored in the profile

```bash
$ cat ~/.aws/credentials
```

[Named Profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) are supported in `.env` configuration file with option

```
AWS.Profile = profile_name
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Connecting to Smart Car

1. Run the app
1. Open http://localhost:3000/smartcar/auth
1. Follow prompts in SmartCar interface
1. Redirected back to https://xxxxxx.ngrok.io/smartcar/exchange?code=xxxxxxxxxx
1. Check vehicle linked http://localhost:3000/debug/vehicles
1. Run the batch http://localhost:3000/smartcar/updateBatch

## Gotchas

> 400
> Unauthorized redirect_uri: https://xxxxxxx.ngrok.io/smartcar/exchange

Smart Car requires whitelisting redirect URL in the dashboard. Login to the Smart Car and enter redirect URL under Credentials menu. The URL needs to match `SmartCar.REDIRECT_URL` in `*.env` config file.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Powered By

<p align="left">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
</p>
