//index.js
import express from 'express';
import cors from 'cors';
import Album from './models/album.js';
import mongoose from './mongodb.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Used to parse JSON bodies
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

// Home route to display all albums
app.get('/', async (req, res, next) => {
  try {
    const albums = await Album.find({}).lean();
    res.render('home', { items: JSON.stringify(albums) }); // Pass albums to the template
  } catch (err) {
    next(err); // Handle errors appropriately
  }
});

// Detail route to display a single album
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

// API Routes

// Get all albums
app.get('/api/albums', async (req, res) => {
  try {
    const albums = await Album.find({}).lean();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: 'Database Error occurred' });
  }
});


// Get a single album by title
app.get('/api/albums/title/:title', async (req, res) => {
  const albumTitle = req.params.title;

  try {
    const album = await Album.findOne({ title: albumTitle }).lean();
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: 'Database Error occurred' });
  }
});

// Delete an album
app.delete('/api/albums/:id', async (req, res) => {
  const itemId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  try {
    const result = await Album.deleteOne({ _id: itemId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json({ message: 'Album deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Database Error occurred' });
  }
});

// Add or update an album
app.post('/api/albums', async (req, res) => {
  const { title, artist, year, genre } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const album = await Album.findOneAndUpdate(
      { title },
      { artist, year, genre },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: 'Database Error occurred' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

