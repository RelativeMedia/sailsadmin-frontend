#sailsadmin-frontend
an angular.js, bootstrap, JWT, sails-Sockets, boilerplate based off of swiip/generator-gulp-angular. Utilizes gulp build processes, wiredep, and browsersync for the build process.

This uses [ngSails](https://github.com/janpantel/angular-sails) for socket based communications to a sails backend, checkout the backend repo for this at [RelativeMedia/sailsadmin-backend](https://github.com/RelativeMedia/sailsadmin-backend)

## Getting Started
run `npm install && bower install` after cloning the repo. Make necessary edits to `src/app/config.json` putting in yout sailsJs backend information under the `api` object.

To fire up the dev server, run `gulp serve`. To build for production into `dist/` run `gulp` and to serve up the production ready code run `gulp serve:dist`.

I added in some logic for angular.js constants rewrites based on your environment. `gulp serve` will build `src/app/constants.js` from `src/app/config.json`.

## App Structure
The app is split and grouped by "component" each component has its own service, model, controller, state, and view. The idea is you should be able to pull a component out (and comment it out of app.js) and the app will work fine.

a typical component is laid out like so:

```
src/app/components/
  singularComponentName/
    stateName/
      stateName.singularComponentName.controller.js
      stateName.tpl.html
    singularComponentName.controllers.js
    singularComponentName.model.js
    singularComponentName.state.js
```

## Authentication & Registration
unlike a lot of other app's the front end handles everything, turning sails into a true API only server.

## Testing
e2e and unit testing on the front end aren't supported yet but the build process work is already there thanks to swiips hard work.
