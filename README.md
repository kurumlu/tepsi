# Tepsi Design System

Tepsi is a collection of design resources, reusable components and a guideline for creating SD Worx websites.

## Quick links

- [Changelog](./CHANGELOG.md)

## Usage

### Local development
```sh
yarn install:all
yarn storybook
```

### Installing package

```sh
yarn config set @sd:registry http://mgmt-verdaccio.intranet.foxandcat.eu:4873
yarn add @sd/tepsi
```

### Local integration inside other package

#### Inside this project:
```sh
npm install -g yalc
yarn publish:local

```

#### Inside integration project:

For the local projects ( sdworxme / sdworx coorporate):
```sh
yarn tepsi_local
```

For other projects:
```sh
yalc add @sd/tepsi
yarn
```

## Contact
- SLACK
