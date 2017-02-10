/**
 * Schema Definitions
 *
 */
import mongoose, { Schema } from 'mongoose';

const VideosSchema = new mongoose.Schema({
  count: Number,
  id: String
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Video', VideosSchema);

