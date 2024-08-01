const dotenv= require("dotenv")
const express = require('express')
const app = express()
const path= require("path")
const bodyParser= require("body-parser")
const API= require("./routes/apiRoutes")

const dbConnet = require("./config/dbConfig")

dotenv.config()

const PORT= process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use("/api", API);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/contacts', (req, res) => {
  res.render('contacts');
});
app.get('/resources', (req, res) => {
  res.render('resources');
});


app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});





app.listen(PORT, async () => {
    await dbConnet()
  console.log(`app listening on port ${PORT}`)
})