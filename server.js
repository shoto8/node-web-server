const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3001;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
       if (err) {
           console.log('unable to append to server.log')
       }
    });
    next();
});


//
//
//SITE MAINTENANCE OVERRIDE CODE
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
//
//


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.get('/', (req, res) => {
    // res.send('<h2>hello express! </h2> <p>How are you doing guys?</p>');
    res.render('home.hbs', {
        pageTitle: 'Home',
        time: `${new Date().getHours()} : ${new Date().getMinutes()}`
    });
});


app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About page'
   });
});

app.get('/home', (req, res) => {
    res.send('This is my home page, welcome!');
});

app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'Unable to handle request'
   });
});

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});