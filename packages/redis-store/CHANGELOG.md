## 3.3.0-rc.3 (2020-05-04)

## 5.0.1

### Patch Changes

- 032e34e: store.close now async, to be able to wait for level to close all databases
- Updated dependencies [032e34e]
  - @eklmv/jscpd-core@5.0.1
  - @eklmv/jscpd-tokenizer@4.0.3

## 5.0.0

### Major Changes

- 8afb3fc: Allow jscpd to track source of duplicates while detecting clones

### Patch Changes

- Updated dependencies [8afb3fc]
  - @eklmv/jscpd-core@5.0.0
  - @eklmv/jscpd-tokenizer@4.0.2

## 4.0.1

### Patch Changes

- f50a42d: publish first public version in v4
- Updated dependencies [f50a42d]
  - @jscpd/tokenizer@4.0.1
  - @jscpd/core@4.0.1

## 4.0.0

### Major Changes

- aac6f4e: make great refactoring of the code, update versions of packages (typescript, pug, etc), change builder - use tsup, change test runner to vitest, move monorepo from lerna to turborepo, add changeset as tool for releases

### Patch Changes

- Updated dependencies [aac6f4e]
  - @jscpd/tokenizer@4.0.0
  - @jscpd/core@4.0.0

* feat: 🎸 add redis store ([2e33bfe](https://github.com/kucherenko/jscpd/commit/2e33bfe))

## 3.3.0-rc.3 (2020-05-02)

- v3.3.0-rc.3 ([9f388ff](https://github.com/kucherenko/jscpd/commit/9f388ff))
- docs: ✏️ update README for the packages ([76492e6](https://github.com/kucherenko/jscpd/commit/76492e6))
- feat: 🎸 start redis store development ([c0a1584](https://github.com/kucherenko/jscpd/commit/c0a1584))
