'use client'; // Add this directive at the top

import axios from 'axios';
import React from 'react';

export async function handleSuggestion(userInput: string, setResponse: React.Dispatch<React.SetStateAction<string>>, extractedImdbUrls: string[]) {
  try {
    const res = await axios.post('/api/suggestionsEngine', { userDescription: userInput, extractedImdbUrls: extractedImdbUrls });
    setResponse(res.data.suggestion);
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ('Invalid user description' === (error as any).response.data.error) {
      setResponse('Invalid user description');
    } else {
      setResponse('Error fetching recommendation');
    }
  }
}
