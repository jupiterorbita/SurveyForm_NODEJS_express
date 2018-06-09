var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
//session
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


app.get('/', function(request, respond){
    console.log('========> "/"');
    respond.render('index');
})

app.get('/results', function(request, respond){
    console.log('========> "/results.ejs"');
    x = [
        request.session.name, 
        request.session.loc, 
        request.session.lang, 
        request.session.comment 
    ]
    respond.render('results', {x:x});
})

app.post('/result', function (req, res){
    console.log('========> "/result post method"');
    console.log('inside users method!') //terminal
    console.log("POST DATA \n\n", req.body) //post data obj
    console.log('\n---------')
    req.session.name = req.body.name;
    req.session.loc = req.body.location;
    req.session.lang = req.body.lang;
    req.session.comment = req.body.comment;
    console.log(req.session.name);
    console.log(req.session.loc);
    console.log(req.session.lang);
    console.log(req.session.comment);
    res.redirect('results');
})

// app.get('/', function(request, respond){
//     console.log('========> inside "/"');
//     if (!request.session.counter){
//         request.session.counter = 1;
//     }
//     else{
//         request.session.counter++
//     }
//     let counter = request.session.counter;
//     console.log('counter =>',request.session.counter)
//     respond.render('counter', {counter:counter});

// app.get("/users/:id", function (req, res){
//     console.log("The user id requested is:", req.params.id);
//     res.send("You requested the user with id=> " + req.params.id);
// });




app.listen(8000, function(){
    console.log("listening on 8000")
})