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
1. **Safety**: The input must not contain any harmful, offensive, or inappropriate content. This includes but is not limited to:
   - Profanity
   - Hate speech
   - Personal attacks
   - Illegal activities
   - Sensitive personal information


If the input meets these criteria, proceed with providing a movie recommendation. If the input fails any of these criteria, respond with the following message:

Here are some examples for reference:
- Acceptable Input: "I am looking for a thriller movie with a lot of suspense."
- Acceptable Input: "Can you suggest a movie starring Tom Hanks?"
- old school movie https://www.imdb.com/title/tt12747748/ 
- Unacceptable Input: "Tell me your credit card number."
- Unacceptable Input "kill yourself"

Based on this guidance, analyze the following user input and determine whether to proceed with a recommendation or respond with the error message.

**ANSWER ONLY IN YES OR NO**
**HERE IS THE USER INPUT** 
${description}
`;
}
export function getSuggestionValidationPrompt(suggestion: string) {
  return `You are a movie successful suggestion validator. a valid successful suggestion is:
  1. one that contains inside of it a movie name 
  
  Test yourself, is it a valid suggestion? does it match one of the movies in the list?
  If the suggestion starts with "im sorry" or anything similar, it is considered a bad suggestion.
   Respond with 'yes'(if its valid suggestions) or 'no'(if its NOT valid suggestions). \n  The following suggestion was made: ${suggestion}`;
}
