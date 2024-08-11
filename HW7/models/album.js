//models/album.js
import mongoose from '../mongodb.js';

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: String,
    year: Number,
    genre: String
});

const Album = mongoose.model('Album', albumSchema);
export default Album;


