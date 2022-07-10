# Journey Monorepo

## About

This monorepo houses applications, services, and libraries related to the Journey project; a task management application. Journey's frontend is built using Typescript with React components and Bulma styling. Currently, there are plans to integrate GraphQL to communicate between the UI and backend services. The backend services themselves will be built with consideration towards one or a combination of languages that include Node.js, PHP, and Go.

## Prerequisites

Please make sure you have the following installed:

- Yarn 3
- Node.js >=16
- Docker
- Homebrew

## Setup

Install package dependencies:

```
  yarn install
```

To create project databases:

- Create a `.env` directory at the project root
- Create `journey-db.env` and `accounts-db.env` files
- Add postgres database passwords in each file

Then run:

```
  make create-dbs
```

To setup apps to be served over HTTPS, the following installs [mkcert](https://github.com/FiloSottile/mkcert) with Homebrew and adds the certificate as trusted to the local system:

```
  make setup-ssl
```

## Development

All work is done on a feature branch based on the `main` branch. When finished, a pull request is opened for the feature branch.

Start project databases:

```
  make start-dbs
```

Start development servers for all apps:

```
  yarn start:all
```

Start development server for a specific app:

```
  APP=app-name yarn start
```

Shutdown project databases:

```
  make stop-dbs
```

Delete project databases:

```
  make destroy-dbs
```

Apps will automatically reload when changes are made to source files.

---

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@journey-monorepo/mylib`.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
