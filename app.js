const express       = require('express'),
      app           = express(),
      port          = 3000,
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local');
      Joke          = require('./models/joke'),
      User          = require('./models/user');

mongoose.connect('mongodb://localhost/twitter', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

//passport configuration
app.use(require('express-session')({
    secret: "I'm afraid I can't tell you that",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    console.log(`Testing form submission: ${JSON.stringify(req.body)}`);
})

app.listen(port, () => console.log(`app listening on port ${port}`));