import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// define the expected fields and types for this object to be inserted into Mongo
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'new',
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: null,
    required: false,
  },
  tags: [String],
});

// The first argument is the collection name, second is the schema to expect
export default mongoose.model('User', userSchema);
