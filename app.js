var express = require('express');
var app = express();
var port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => console.log(`app listening on port ${port}`));