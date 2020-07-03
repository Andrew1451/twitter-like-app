const express       = require('express'),
      app           = express(),
      port          = 3000,
      flash         = require('connect-flash'),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      Joke          = require('./models/joke'),
      User          = require('./models/user');

// create/connect to twitter database
mongoose.connect('mongodb://localhost/twitter', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

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

//middleware to make sure user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('signup', {errorMessage: err.message});
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/home')
        });
    });
});

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.post('/signin', (req, res) => {
    passport.authenticate('local')(req, res, () => {
        res.redirect('/home');
    });
});

app.get('/home', isLoggedIn, (req, res) => {
    res.render('home', {user: req.user.username})
});

app.post('/joke', (req, res) => {
    //find user from mongoDB
    User.findOne({username: req.user.username}, (err, user) => {
        if (err) {
            res.redirect('/login')
        } else {
            //save joke to mongoDB
            Joke.model.create({joke: req.body.joke}, (err, joke) => {
                if (err) {
                    res.redirect('/home', {errorMessage: "Couldn't save joke.."})
                } else {
                    //add joke to user's jokes
                    user.jokes.push(joke);
                    user.save();
                    res.redirect('/home');
                }
            });
        }
    });
});

app.get('/:id/your-jokes', isLoggedIn, (req, res) => {
    //find user by username
    User.findOne({username: req.user.username}, (err, user) => {
        if (err) {
            redirect('/signin');
        } else {
            //render page. pass in jokes and user
            res.render('user-jokes', {jokes: user.jokes, user: req.user.username});
        }
    });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/signin');
});

app.listen(port, () => console.log(`Server running....`));