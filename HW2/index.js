// index.js
import express from 'express';
import { getAll, getItem } from './data.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(express.static('./public')); // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Home route
app.get('/', (req, res) => {
  const items = getAll();
  res.render('home', { items });
});

// Detail route
app.get('/detail', (req, res) => {
  const item = getItem(req.query.id);
  res.render('detail', { item });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
