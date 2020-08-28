// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
var axios = require('axios');

module.exports = function(app) {
  // Route for logging in
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post('/api/pet', function(req,res) {
    db.Pet.create({
      name: req.body.name,
      breed: req.body.breed,
      sex: req.body.sex,
      age: req.body.age,
      vetRecords: req.body.vetRecords,
      UserId: req.user.id
    }).then(function(results) {
      // return new pet information from db
      res.json(results);
    }).catch(err => res.status(401).json(err));
  });

  // Route to delete a pet entry
  app.delete('/api/delete/:id', function(req,res) {
    db.Pet.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    }).catch(err => res.status(204).json(err));
  });

  // Route to update a pet entry
  app.put('/api/update/:id', function(req, res) {
    db.Pet.update({
      vetRecords: req.body.petInformation,
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    }).catch(err => res.status(401).json(err));
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.status(401).json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      // console.log(req);
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username
      });
    }
  });

  // Route for getting breed search from TheDogApi
  app.get("/api/searchBreed/:breed", function(req, res) {
    if (!req.user) {
      //return empty if not logged in user
      res.json({})
    } else {
      var query = req.params.breed
      axios({
        method: 'GET',
        url: 'https://api.thedogapi.com/v1/breeds/search?q='+query,
        headers: {
          "x-api-key": process.env.API_KEY
        }
      }).then((response) =>{
        // console.log(response.data);
        let petNames = response.data.map(pet => pet.name);
        res.send(petNames);
      })
    }
  });

  // Route for getting Pets from db
  app.get('/api/pet_data', function(req,res) {
    db.Pet.findAll({
      where: {
        UserId: req.user.id
      },
    }).then(results => res.json(results))
    .catch(err => res.status(401).json(err));
  });
};
