const express = require('express');
const path = require('path');
const prisma = require('./config/database')
const rateLimit = require('express-rate-limit');


const clothesRoutes = require('./routes/catalogRoutes');


const app=express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1); // penting



app.use('/', clothesRoutes);



app.get('/404', (req, res)=>{
  res.render('404')
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});