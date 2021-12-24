"use strict";

require("core-js/modules/es.promise.js");

var _express = _interopRequireDefault(require("express"));

var _Movie = _interopRequireDefault(require("./Models/Movie.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = _interopRequireDefault(require("./routes.js"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// because we make the connection to the DB here in this file
// To parse the POST request
// ########## using async/await ############
const start = async () => {
  try {
    await _mongoose.default.connect('mongodb://localhost/netflux');
    console.log("let's create an app");
    const app = (0, _express.default)(); // Use bodyParser in our App to parse every POST requeste

    app.use(_bodyParser.default.urlencoded({
      extended: true
    }));
    console.log("app is created");
    (0, _routes.default)(app);
    console.log("let's listen to the server");
    const port = 6200;
    app.listen(port, () => {
      console.log("Example app listening at http://localhost:".concat(port));
    });
  } catch (error) {
    console.log(error);
  }
};

start();
/*
- Eroor in postman : Post
- install body-parser
- import bodyParser in index.js
- use bodyParser in our app to parse every info from POST request (after : const app = express() ) ==> app.use(bodyParser.urlencoded({extended: true}))
- Now, when we send a user info using Postman => a new user will be created in our DB.
- After that, we will prevent adding duplicated users in the DB --> so for every POST req we will check if the {name,email} are already existing in DB

    
*/