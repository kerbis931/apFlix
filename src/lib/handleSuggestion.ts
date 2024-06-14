'use client'; // Add this directive at the top

import axios from 'axios';
import React from 'react';

export async function handleSuggestion(userInput: string, setResponse: React.Dispatch<React.SetStateAction<string>>, extractedImdbUrls: string[]) {
  try {
    const res = await axios.post('/api/suggestionsEngine', { userDescription: userInput, extractedImdbUrls: extractedImdbUrls });
    setResponse(res.data.suggestion);
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    setResponse('Error fetching recommendation');
  }
}
