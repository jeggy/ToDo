/**
 * Created by Jógvan on 02/05-2016 20:36.
 */

var jwt = require('jwt-simple');
var passport = require('passport');
var config = require('../../config/config');

var User = require('../models/user');

module.exports = function(app) {

    app.post('/api/user/register', function(req, res) {
        if (!req.body.username || !req.body.password) {
            res.json({success: false, msg: 'Username and/or password is missing.'});
        } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password,
                fullname: req.body.fullname,
                age: req.body.age
            });
            // save the user
            newUser.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                res.json({success: true, msg: 'Successful created new user.'});
            });
        }
    });


    app.post('/api/user/login', function(req, res) {
        // TODO: Something is not working. Debug ;)
        if(req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) {
            User.findOne({username: req.body.username}, function (err, user) {
                if (err) throw err;

                if (!user) {
                    res.send({success: false, msg: 'Authentication failed. User not found.'});
                } else {
                    // check if password matches
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            var token = jwt.encode(user, config.secret);
                            // return the information including token as JSON
                            res.json({success: true, token: 'JWT ' + token});
                        } else {
                            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                        }
                    });
                }
            });
        }else{
            res.send({success: false, msg: 'Authentication failed. Please specify a username and password in your http request body.'});
        }
    });


    // app.get('/api/user', function (req, res) {
    //     User.find({}, function (err, users) {
    //         res.send(users);
    //     });
    // });
    //
    // app.post('/api/user', function(req, res) {
    //     var newUser = new User({
    //         username: req.body.username,
    //         password: req.body.password
    //     });
    //
    //     newUser.save(function (err) {
    //         if (!err) {
    //             return res.status('200').send();
    //         } else {
    //             console.log(err);
    //             if(err.name == 'ValidationError') {
    //                 res.status(400).send({validation_error: err.errors});
    //             } else {
    //                 res.status(500).send({error: 'Server error'});
    //             }
    //         }
    //     });
    // });

};