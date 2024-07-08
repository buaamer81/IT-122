// app.js

import { getAll, getItem } from './data.js';

// Get all albums
const allAlbums = getAll();
console.log('All Albums:', allAlbums);

// Get a specific album by id
const albumId = 3;
const album = getItem(albumId);
console.log(`Album with ID ${albumId}:`, album);
