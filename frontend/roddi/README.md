## Code

The frontend code for our website is written in React, with javascript and HTML. The code is structured as a single page application with a variety of components enabled/disabled based on the url and access of the user.

Specifically, each "page" on the website is a component, which is loaded in to the main app.js whenever the requirements to display a certain component are met.

## Communication with backend

We use the Axios library, a promise based HTTP client to make requests to the backend. In the folder `frontend/roddi/src/services` there is a file `auth.service.js` that consists of all the API-call functions. 

The functions in the code that needs to fetch/send data from/to the server, will use these helperfunctions in their methods to communicate with the server.


## Authorization

To authenticate the users, we use JWT (JSON Web Token) to encode and safely store the data of a user. 

When a user logs in, a call is made to `localhost:8000/auth-token` with the username and password as data, which then, if correct credentials are provided, returns a token to identify the user. Our implementation stores this token in the localstorage until the user logs out. All of the API calls require a token to be called successfully, so everytime a user communicates with the server, we get the token from localstorage, and sends this in the header of the HTTP request. If there is no token, none of the calls will be available.


## Available Scripts

In the frontend directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser( **remember to run the server as well!** ).

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
