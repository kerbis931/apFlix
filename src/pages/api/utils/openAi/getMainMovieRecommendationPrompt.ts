export function getMainMovieRecommendationPrompt(movies: string[]): string {
  return `Please suggest a movie based on my description from the following list:
  You can also refer to the "context"(which includes the pageContent and the movieName) section below for additional movie recommendations.
  PLEASE to recommend any movie from these sections, even if it's not listed here:
  
  Here is the users description: {input}
  context: {context}

  Other movies:
  \n${movies.join(', ')}
  
  ALSO, always put the movie name in single quotes like 'movie name' at the start of your response.`;
}
