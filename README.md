The Revive was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Code
Revive has a standard architectural layering of: server side APIs with a JavaScript client on the front-end. The backend mainly serves up data through RESTful, link-based APIs. The front-end, in addition to `React`, uses `Redux` to manage application state and `Redux-Saga` to deal with asynchronous actions, primarily data fetching. It's preferrable to use `Formik` and `Redux-form` packages for any forms features. 
<br><br>
All app code is located in `src` folder.<br>
The `action` folder contains all Redux Actions.<br>
The `common` folder keeps API calls function (subfolder `api`), all reusable components (`components`), some constants, all text messages for the next localization(`messages`).<br>
All container components is located in `container` folder. The Auth container is used only for logged in users.<br>
The Revive app has a lot of pages in the `page` folder. They are nested in folders by their purpose.<br>
The Reducers in the folder `reducer` specify how the application's state changes in response to actions sent to the store.<br>
All Sagas to deal with asynchronous actions are located in the `saga` folder.<br>
The app uses two store (one for development goal with logger and one more for production) in the `store` folder.<br>
<br>
The `mail` folder contains all emails for the Revive project.

## Available Scripts

In the project directory, you can run:

### `npm start:dev`

Runs the app in the development mode for `dev` enviroment.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build:dev|prod`

Builds the app for production to the `build` folder for `dev|prod` enviroment. It correctly bundles React and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

