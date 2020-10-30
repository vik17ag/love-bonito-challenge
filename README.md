# Love, Bonito VueJS Frontend Developer Challenge

This is a submission to this [Challenge](https://github.com/love-bonito/frontend-developer-full#love-bonito-vuejs-frontend-developer)

### About the App

The web app fetches and displays a list of **locations** and **characters** from the [public Rick and Morty's API.](https://rickandmortyapi.com/)
It covers 6 challenges which match the 6 merge pull requests from 6 different branches. You can visit the challenge link given above to see more details about each challenge.

### Important note about unit testing
The unit tests after Challenge #4 have been commented because they fail to mock the Dexiejs library. A proper [Jest ](https://jestjs.io/) implementation for [Dexie ](https://dexie.org/) could not be found. 

You are welcome to fork the project , add an implementation and give a pull request.

Some helpful links -

- [https://github.com/dfahlander/Dexie.js/issues/493](https://github.com/dfahlander/Dexie.js/issues/493)
- [https://dev.to/johnson_cor/how-to-write-tests-for-a-library-that-requires-being-run-on-the-browser-like-dexie-js-or-localforage-48k7](https://dev.to/johnson_cor/how-to-write-tests-for-a-library-that-requires-being-run-on-the-browser-like-dexie-js-or-localforage-48k7)

Alternatives

- Unit testing of Vue with [Cypress](https://github.com/bahmutov/cypress-vue-unit-test) 
- Replace Dexie with plain vanilla IndexedDb and write unit tests directly for indexedDb.

### Core libraries / frameworks used -

- Vuejs as main framework
- BootstrapVue for styling
- Dexiejs for storing in IndexedDb
- Axios for calling APIs
- Jest for unit tests
- Cypress for end-to-end tests
- EsLint for lint tests

### Deployment
It has been deployed to Vercel using CI [here](https://love-bonito-challenge.vercel.app/)

## Project setup 
Clone the project and run following commands

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your audit
```
npm audit
```

### Lints and fixes files
```
npm run lint
```

### Run jest end-to-end tests
```
npm run test:e2e
```

### Run cypress unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
).
