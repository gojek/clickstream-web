# Contribution Guidelines

## Getting started

- Clone the repo.

- Run `npm install` to install all the dependencies.

## Making Changes

- Create a topic branch from `main` branch.

- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and chose a proper commit message description.

- Raise & merge the PR in `main` branch.

## Releasing a new version

### Pre-requisite

Make sure to have access to publish packages under `@gojek` scope in public npm registry, contact [@detj](https://github.com/detj) for getting access.

### Steps

[standard-version](https://github.com/conventional-changelog/standard-version) is used for release management.

- Run `npm run release` to create a new release as per conventional commit types.

- Run `git push --follow-tags origin main` to push the created release tag to remote origin `main` branch.

- Run `npm publish` to publish the package in public npm registry.

## Dependencies

SDK uses [Raccoon proto](https://github.com/odpf/proton/blob/main/odpf/raccoon/v1beta1/raccoon.proto) which is stored in the SDK [here](https://github.com/gojek/clickstream-web/tree/main/src/protos). This contains the request and response protos which are used to encode/decode the event payload.

> These files need to be in sync in order to correctly exchange the data between the SDK and [Raccoon](https://odpf.github.io/raccoon/). Otherwise SDK might throw error due to format mismatch.
