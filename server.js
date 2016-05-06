/**
 * Created by Jógvan on 02/05-2016 14:40.
 */


var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();

app.use(bodyParser.urlencoded({extended: false})); // JSON parsing

app.use(passport.initialize());
app.use(passport.session());

require('./libs/passport')(passport);


require('./app/routes')(app);

var Todo =require('./app/models/todo');
// new Todo({
//     title: "Root3!",
//     owner: "5729fec3b2102fdd1dd53a32",
//     root: "572ca64d9968202f179b2cee",
//     parent: "572ca64d9968202f179b2cee"
// }).save();

// var User = require('./app/models/user');
// User.findOne({_id: "5729fec3b2102fdd1dd53a32"}, function (err, doc) {
//
//     Todo.fetchTodos(doc, function (err, todos) {
//         todos.forEach(function (todo) {
//             console.log(todo.title);
//         });
//     })
// });

Todo.findOne({_id: "572ca64d9968202f179b2cee"}).populate('child').exec(function (err, doc) {
    // console.log(doc);

    if(doc != null){
        doc.remove(function (err, removed) {
            console.log(" Removed!");
        });
    }
});

// Todo.fetchTodos();

app.listen(3000);
