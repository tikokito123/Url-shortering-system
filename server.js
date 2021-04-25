const mongoose = require('mongoose');
const express = require('express');
const shortUrl = require('./models/shortUrl');
const app = express();

mongoose.connect('mongodb://localhost:27017/mongo-exercises', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then('connect to mongoose').catch('failed to connect mongoose!');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const url = await shortUrl.find();
    res.render('index', {url: url});
});

app.post('/shortUrls', async (req, res) => {
    await shortUrl.create({ full: req.body.FullUrl });

    res.redirect('/');
});

app.get('/:shortUrl',async (req, res) => {
  const result = await shortUrl.findOne({ short: req.params.shortUrl});
  if(!result) return res.sendStatus(404);
  
  result.clicks++;
  result.save();

  res.redirect(result.full);
})
const result = app.listen(process.env.PORT || 3000);
if(result)
    console.log('connected');