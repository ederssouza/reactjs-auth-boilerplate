<p align="center">
  <h1 align="center">React JS Authentication Boilerplate</h1>
</p>

<p align="center">
  <a href="https://app.travis-ci.com/ederssouza/reactjs-auth-boilerplate">
    <img src="https://app.travis-ci.com/ederssouza/reactjs-auth-boilerplate.svg?branch=master" alt="Build Status" />
  </a>

  <a href='https://coveralls.io/github/ederssouza/reactjs-auth-boilerplate?branch=master'>
    <img src='https://coveralls.io/repos/github/ederssouza/reactjs-auth-boilerplate/badge.svg?branch=master' alt='Coverage Status' />
  </a>

  <a href="https://github.com/ederssouza/reactjs-auth-boilerplate/blob/master/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat" alt="Coverage Status" />
  </a>
</p>

## Summary

- [About](#about)
- [Built using](#built-using)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing dependencies](#installing-dependencies)
- [Project setup](#project-setup)
  - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
  - [Compiles and minifies for production](#compiles-and-minifies-for-production)
  - [Lints and fixes files](#lints-and-fixes-files)
  - [Run your unit tests](#run-your-unit-tests)
- [Test users](#test-users)
  - [Administrator](#administrator)
  - [Client](#client)
- [Route types](#route-types)
  - [Public route](#public-route)
  - [Hybrid route](#hybrid-route)
  - [Private route](#private-route)
- [Control visibility of components](#control-visibility-of-components)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)

## About

This repository was created to assist in the authentication implementation process in React **JS applications with JWT and refresh token**. All components and contexts have **unit tests** and a **basic HTML structure without CSS**. The project has features to **secure routes** and **control the visibility of components** based on permissions, the entire implementation process is in this document.

Feel free to clone the project or use it as a template and make any changes you deem necessary.

## Built using

- [React JS](https://reactjs.org): JavaScript library
- [TypeScript](https://www.typescriptlang.org): JavaScript With Syntax For Types.
- [Jest](https://jestjs.io): JavaScript Testing Framework
- [React Testing Library](https://testing-library.com): Testing utilities

## Getting started

### Prerequisites

You need to install on your machine [Node.js](https://nodejs.org) or [Yarn](https://yarnpkg.com).

### Installing dependencies

```bash
npm install
# or
yarn install
```

## Project setup

### Compiles and hot-reloads for development

```bash
# start app open development mode
yarn start
# or
npm run start
```

### Compiles and minifies for production

```bash
yarn build
# or
npm run build
```

### Lints and fixes files
```bash
# show errors
yarn lint
# or
npm run lint

# fix errors
yarn lint:fix
# or
npm run lint:fix
```

### Run your unit tests

```bash
# run tests
yarn test
# or
npm run test

# run tests on watch mode
yarn test:watch
# or
npm run test:watch

# run tests on coverage mode
yarn test:coverage
# or
npm run test:coverage

# run tests on coverage with watch mode
yarn test:coverage:watch
# or
npm run test:coverage:watch
```

## Test users

The app is integrated with the [node-api-refresh-token.herokuapp.com](https://node-api-refresh-token.herokuapp.com) API, configured in the `.env` file. There are two users with different accesses so that the tests can be performed:

### Administrator

- **Email**: admin@site.com
- **Password**: password@123
- **Permissions**: `users.list`, `users.create`, `metrics.list`

### Client

- **Email**: client@site.com
- **Password**: password@123
- **Permissions**: `metrics.list`

## Route types

The route components are based on `<Route />` component of [react-router-dom](https://reactrouter.com/web/guides/quick-start) and receive same props.

### Public route

The route can only be accessed if a user is not authenticated. If accessed after authentication, the user will be redirected `/` route.

```js
import { Switch } from 'react-router-dom'
import { PublicRoute } from 'src/routes/PublicRoute'

const SampleComponent = () => <div>Sample component</div>

export const Routes = () => (
  <Switch>
    <PublicRoute
      path="/login"
      component={SampleComponent}
    />
  </Switch>
)
```

### Hybrid route

The route can be accessed whether a user is authenticated or not.

```js
import { Switch } from 'react-router-dom'
import { HybridRoute } from 'src/routes/HybridRoute'

const SampleComponent = () => <div>Sample component</div>

export const Routes = () => (
  <Switch>
    <HybridRoute
      path="/register"
      component={SampleComponent}
    />
  </Switch>
)
```

### Private route

The route can only be accessed if a user is authenticated. Use permission props to access control.

```js
import { Switch } from 'react-router-dom'
import { PrivateRoute } from 'src/routes/PrivateRoute'

const SampleComponent = () => <div>Sample component</div>

export const Routes = () => (
  <Switch>
    {/*
      allow route access if the user has the permissions
      `users.list` and `users.create`
    */}
    <PrivateRoute
      path="/users"
      component={SampleComponent}
      permissions={['users.list', 'users.create']}
    />
  </Switch>
)
```

## Control visibility of components

Use the `CanAccess` component and pass `permissions` props to control the visibility of a component.

```js
import { CanAccess } from 'src/components/CanAccess'

export function NavBar () {
  return (
    <>
      {/*
        the component is shown if the user has the permissions
        `users.list` and `metrics.list`
      */}
      <CanAccess permissions={['users.list', 'metrics.list']}>
        {/* YOUR COMPONENT HERE */}
      </CanAccess>
    </>
  )
}
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ederssouza/reactjs-auth-boilerplate/tags).

## Authors

See also the list of [contributors](https://github.com/ederssouza/reactjs-auth-boilerplate/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

----

Develop by Eder Sampaio 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/ederssouza).
