import dbConnect from './dbConnect';
import SearchHistory from '@app/pages/api/models/SearchHistory';

export async function saveLastSuggestionToDb(suggestion: string | undefined, userDescription: string) {
  if (suggestion) {
    await dbConnect();
    const newSearchHistory = new SearchHistory({ userDescription, suggestion });
    await newSearchHistory.save();
  }
}
