import axios from 'axios';

export async function fetchRecommendation(userInput: string, extractedImdbUrls: string[]) {
  try {
    const res = await axios.post('/api/suggestionsEngine', { userDescription: userInput, extractedImdbUrls: extractedImdbUrls });
    return res.data.suggestion;
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ('Invalid user description' === (error as any).response.data.error) {
      return 'Invalid user description';
    } else {
      return 'Error fetching recommendation';
    }
  }
}
