This repo demonstrates an issue transpiling ES6 modules to ES5 in an NX workspace.

# Problem

Some node module dependencies are only provided in ES6 syntax.  When supporting
IE11 all code should be transpiled to ES5.  

# Solution

According to the details found [in this issue](https://github.com/nrwl/nx/issues/2209) this can be fixed by adding a custom webpack configuration and replacing
the exclude option of the web-babel-loader.

# Changes made in this repo

1. Modify `apps/example/.browserslistrc` to add support for IE11
2. Modify `apps/example/src/main.tsx` to provide a reduced test case.
3. Install a node dependency that is ES6 only (`string-width@5.0.1`)
4. Install `are-you-es5` to help build a regex to identify ES6 modules that need transpiling
5. Modify `workspace.json` to use a custom `webpack.config.js` file
6. Created custom `webpack.config.js` file and modified the webpack config to ensure
ES6 modules are transpiled

# Expected results

After creating a build, the `string-width` dependency should be transpiled to ES5 in the output build.

# Actual results

After creating a build, the `string-width` dependency is still ES6 format in output build.

Excerpt from build output:
```
// CONCATENATED MODULE: /Users/karl/Source/test-es6-transpile-es5-builds/node_modules/string-width/index.js



function stringWidth(string) {
  if (typeof string !== 'string' || string.length === 0) {
    return 0;
  }

  string = stripAnsi(string);

  if (string.length === 0) {
    return 0;
  }

  string = string.replace(emoji_regex_default()(), '  ');
  let width = 0;

  for (let index = 0; index < string.length; index++) {
    const codePoint = string.codePointAt(index); // Ignore control characters

    if (codePoint <= 0x1F || codePoint >= 0x7F && codePoint <= 0x9F) {
      continue;
    } // Ignore combining characters


    if (codePoint >= 0x300 && codePoint <= 0x36F) {
      continue;
    } // Surrogates


    if (codePoint > 0xFFFF) {
      index++;
    }

    width += isFullwidthCodePoint(codePoint) ? 2 : 1;
  }

  return width;
}
// CONCATENATED MODULE: ./main.tsx
```

# Reproduction steps

1. Install dependencies with `npm i`
2. Produce a build with `nx build example --prod`
3. Inspect the output bundle (the `main` chunk).  There should be no ES6 code.

-------

# TestEs6TranspileEs5Builds

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**

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

Libraries are shareable across libraries and applications. They can be imported from `@test-es6-transpile-es5-builds/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
