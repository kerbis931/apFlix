import mongoose from 'mongoose';

const SearchHistorySchema = new mongoose.Schema({
  userDescription: { type: String, required: true },
  suggestion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SearchHistory = mongoose.models.SearchHistory || mongoose.model('SearchHistory', SearchHistorySchema);

export default SearchHistory;
