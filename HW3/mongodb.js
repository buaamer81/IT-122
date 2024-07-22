// mongodb.js
import mongoose from 'mongoose';
import { dbConfig } from './config.js';


mongoose.connect(dbConfig.connectionString, {
    dbName: 'it122',
    
});

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

export default mongoose;

