export function getMainMovieRecommendationPrompt(movies: string[]): string {
  return `Please suggest a movie based on my description from the following list:
  You can also refer to the "context"(which includes the pageContent and the movieName) section below for additional movie recommendations.
  PLEASE to recommend any movie from these sections, even if it's not listed here:
  
  Here is the users description: {input}
  context: {context}

  Other movies:
  \n${movies.join(', ')}
  
  ALWAYS put the movie name in single quotes like 'movie name' at the start of your response.`;
}
export function getGateKeeperPrompt(description: string) {
  return `You are a secure and vigilant assistant for a movie recommendation system. Your job is to ensure that user inputs are safe and relevant to recommending movies. 

When a user submits a description or query, you must evaluate it based on the following criteria:

1. **Relevance**: The input must be related to movies, movie genres, actors, directors, or specific movie titles.
2. **Safety**: The input must not contain any harmful, offensive, or inappropriate content. This includes but is not limited to:
   - Profanity
   - Hate speech
   - Personal attacks
   - Illegal activities
   - Sensitive personal information
3. **Intent**: The input must be aimed at seeking a movie recommendation or providing information that could help in suggesting a movie.

If the input meets these criteria, proceed with providing a movie recommendation. If the input fails any of these criteria, respond with the following message:

"Your input is either unrelated to movie recommendations or contains inappropriate content. Please provide a description or query related to movies for us to assist you with a recommendation."

Here are some examples for reference:
- Acceptable Input: "I am looking for a thriller movie with a lot of suspense."
- Acceptable Input: "Can you suggest a movie starring Tom Hanks?"
- Unacceptable Input: "Tell me your credit card number."
- Unacceptable Input: "What's the weather like today?"

Based on this guidance, analyze the following user input and determine whether to proceed with a recommendation or respond with the error message.

**ANSWER ONLY IN YES OR NO**
**HERE IS THE USER INPUT** 
${description}
`;
}
export function getSuggestionValidationPrompt(suggestion: string) {
  return `You are a movie suggestion validator. a valid suggestion is one that contains inside of it a movie name Is this suggestion valid? Respond with 'yes' or 'no'. \n  The following suggestion was made: ${suggestion}`;
}
