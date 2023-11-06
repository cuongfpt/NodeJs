const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars'); // Sử dụng exphbs thay vì handlebars
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

// Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('home');
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});