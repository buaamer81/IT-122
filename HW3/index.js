//APP/index.js
import express from 'express';
import Album from './models/album.js'; // Adjust the path if necessary
import mongoose from './mongodb.js'; // Adjust the path if necessary

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(express.static('./public')); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', async (req, res, next) => {
  try {
    const albums = await Album.find({}).lean();
    res.render('home', { albums }); // Pass albums to the template
  } catch (err) {
    next(err); // Handle errors appropriately
  }
});

app.get('/detail', async (req, res, next) => {
  const itemId = req.query.id;

  if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send('Invalid item ID');
  }

  try {
    const album = await Album.findOne({ _id: itemId }).lean();
    if (!album) {
      return res.status(404).send('Album not found');
    }
    res.render('detail', { album });
  } catch (err) {
    next(err); // Handle errors appropriately
  }
});


// 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
