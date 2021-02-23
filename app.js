const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const playstore = require('./playstore');

const app = express();

app.use(cors());

app.use(morgan('common')); 

app.get('/apps', (req, res) => {
  const { sort = "", genre = ""} = req.query;
  
  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res
      .status(400)
      .send('Sort must be either rating or app');
    }
  }

  if (genre) {
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
      return res
      .status(400)
      .send('Genre must be valid');
    }
  }

  let results = playstore
          .filter(app =>
              app
                .Genres //is the data
                .toLowerCase() //genre is a variable
                .includes(genre.toLowerCase()));//indexOf is a string method
  if (sort) {
        results
          .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
      }

      res
        .json(results);
});

app.listen(8080,()=>console.log('app started in 8080'))

/* app.get('/books', (req, res) => {
    const { search = "", sort } = req.query;
    
  
    if (sort) {
      if (!['title', 'rank'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of title or rank');
      }
    }
  
    let results = books
          .filter(book =>
              book
                .title
                .toLowerCase()
                .includes(search.toLowerCase()));
  
    if (sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }
  
    res
      .json(results);
  }); */