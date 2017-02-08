/**
 * Schema Definitions
 *
 */
import mongoose, { Schema } from 'mongoose';

const VideosSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  publishedDate: { type: Date, default: Date.now },
  availableDate: { type: Date, default: Date.now },
  metadata: Schema.Types.Mixed,
  contents: Schema.Types.Mixed,
  credits: Schema.Types.Mixed,
  parentalRatings: Schema.Types.Mixed,
  images: Schema.Types.Mixed,
  categories: Schema.Types.Mixed,
  id: String
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Video', VideosSchema);

