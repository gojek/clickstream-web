# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.1](https://github.com/gojekfarm/clickstream-web/compare/v1.0.0...v1.0.1) (2022-12-13)

### Bug Fixes

- does not initialize on iOS < 14 ([4656a41](https://github.com/gojekfarm/clickstream-web/commit/4656a4128a133a0e0f9fead9011f83eb70f37c57)), closes [#19](https://github.com/gojekfarm/clickstream-web/issues/19)

## [1.0.0](https://github.com/gojekfarm/clickstream-web/compare/v0.2.0...v1.0.0) (2022-11-25)

### Features

- add config validation ([fc50037](https://github.com/gojekfarm/clickstream-web/commit/fc50037625420f90fbd8217f36e6c7c80e27b963))
- add error module ([a6c40bf](https://github.com/gojekfarm/clickstream-web/commit/a6c40bfbedf7f228d0cd7451bc0dd0582cb76388))
- enable logging ([ee1cc2b](https://github.com/gojekfarm/clickstream-web/commit/ee1cc2b5c4a325327217f89cc85ff0163c7bfb45))

### Bug Fixes

- process network response only when status is ok ([c2d9e90](https://github.com/gojekfarm/clickstream-web/commit/c2d9e90febd1538224b95e2051df49341525d193))

## [0.2.0](https://github.com/gojekfarm/clickstream-web/compare/v0.1.3...v0.2.0) (2022-09-27)

### Features

- add config for crypto ([e48931c](https://github.com/gojekfarm/clickstream-web/commit/e48931ca8c68ff088f73d83e9ab839a27c0dcd84))
- add config for database ([3b700a6](https://github.com/gojekfarm/clickstream-web/commit/3b700a6ea776cb5157bb85c4942f7699a0e66044))
- exclude QoS0 events from batching ([0f71815](https://github.com/gojekfarm/clickstream-web/commit/0f71815747f9323c7dff1266c5c8f0fddf1ecf3c))

### [0.1.3](https://github.com/gojekfarm/clickstream-web/compare/v0.1.2...v0.1.3) (2022-09-20)

### [0.1.2](https://github.com/gojekfarm/clickstream-web/compare/v0.1.1...v0.1.2) (2022-09-20)

### Bug Fixes

- event type when group is empty ([65040d0](https://github.com/gojekfarm/clickstream-web/commit/65040d0de7b5bda5d13763bc19fe572e1d3f95ae))

### [0.1.1](https://github.com/gojekfarm/clickstream-web/compare/v0.1.0...v0.1.1) (2022-09-20)

### Bug Fixes

- add module in package.json ([7ce3497](https://github.com/gojekfarm/clickstream-web/commit/7ce3497c0a8aa8358f9a23b7293dc6117650c767))
- add module in package.json ([0fcc89c](https://github.com/gojekfarm/clickstream-web/commit/0fcc89c358605cdfc2d72bfcc0c5fff6667e7104))

## [0.1.0](https://github.com/gojekfarm/clickstream-web/compare/v0.0.6...v0.1.0) (2022-09-13)

### Features

- add automatic retriy for QoS1 events ([0cd4a28](https://github.com/gojekfarm/clickstream-web/commit/0cd4a28698ba6ac8f49d5bf7ad5fa7292421c2a0)), closes [#3](https://github.com/gojekfarm/clickstream-web/issues/3)
- add classification for events based on config ([d85d5de](https://github.com/gojekfarm/clickstream-web/commit/d85d5de4faf269ca83f05c97440b0ea7b5b9bbd0)), closes [#5](https://github.com/gojekfarm/clickstream-web/issues/5)
- add storage mechanism for QoS1 events ([8b10f36](https://github.com/gojekfarm/clickstream-web/commit/8b10f36e280c28aec5a84573003857dcb03af83f)), closes [#2](https://github.com/gojekfarm/clickstream-web/issues/2)
- support QoS1 events ([4e9d636](https://github.com/gojekfarm/clickstream-web/commit/4e9d636ddff5b33e34cc22869f83afd89e29cc26))

### [0.0.7](https://github.com/gojekfarm/clickstream-web/compare/v0.0.6...v0.0.7) (2022-09-13)

### Features

- add automatic retriy for QoS1 events ([0cd4a28](https://github.com/gojekfarm/clickstream-web/commit/0cd4a28698ba6ac8f49d5bf7ad5fa7292421c2a0)), closes [#3](https://github.com/gojekfarm/clickstream-web/issues/3)
- add classification for events based on config ([d85d5de](https://github.com/gojekfarm/clickstream-web/commit/d85d5de4faf269ca83f05c97440b0ea7b5b9bbd0)), closes [#5](https://github.com/gojekfarm/clickstream-web/issues/5)
- add storage mechanism for QoS1 events ([8b10f36](https://github.com/gojekfarm/clickstream-web/commit/8b10f36e280c28aec5a84573003857dcb03af83f)), closes [#2](https://github.com/gojekfarm/clickstream-web/issues/2)
- support QoS1 events ([4e9d636](https://github.com/gojekfarm/clickstream-web/commit/4e9d636ddff5b33e34cc22869f83afd89e29cc26))

### [0.0.6](https://github.com/gojekfarm/clickstream-web/compare/v0.0.5...v0.0.6) (2022-08-29)

### [0.0.5](https://github.com/gojekfarm/clickstream-web/compare/v0.0.4...v0.0.5) (2022-08-29)

### Bug Fixes

- event proto encoding ([884d6ed](https://github.com/gojekfarm/clickstream-web/commit/884d6ed41b02dce24f2dadbb50bf99d3b3464afd))

### 0.0.4 (2022-08-17)

### Features

- add event ([15a253b](https://github.com/gojekfarm/clickstream-web/commit/15a253bd6d84e4e7362dbb32f1e9febd5c1af1c9))
- add id module ([1ea4c47](https://github.com/gojekfarm/clickstream-web/commit/1ea4c47efd440dfe587dfe13f8bc8e8279d4e2aa))
- add network ([36d8eda](https://github.com/gojekfarm/clickstream-web/commit/36d8eda585cafa427ca7a411cd72f8e3fac1bffc))
- add processor ([a58aba4](https://github.com/gojekfarm/clickstream-web/commit/a58aba4e903730503208f66a32fc1599539df580))
- add protobufjs as dependecy ([a251c37](https://github.com/gojekfarm/clickstream-web/commit/a251c3781822ad8c95dfcded584c288b33c69701))
- add scheduler ([fe4646d](https://github.com/gojekfarm/clickstream-web/commit/fe4646d03c73192ad7123ad3544975cfab918679))

### Bug Fixes

- multiple content-type header addition ([2e7136a](https://github.com/gojekfarm/clickstream-web/commit/2e7136aa82bb69eb2f21d5f058ddd85966130cb8)), closes [#1](https://github.com/gojekfarm/clickstream-web/issues/1)
