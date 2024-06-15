# APFLIX - by Tal Kerbis
Welcome to APFLIX! Use it here - [link](http://www.talkerbis.com)

APFLIX is a movie recommendation assistant that helps users find movies based on their preferences. Users can provide a description of what they're looking for and share IMDb links to movies they're interested in order to enrich the recommendations since the system holds data up to 2021.
More than that, user can overview their history of recommendations and the view is integrated with movie thumbnails from OMDB API.

## Development
1. Clone the repository 
2. Fill the keys for 
```bash
OPENAI_API_KEY=ADD_YOUR_OPEN 
OMDB_API_KEY=ADD_YOUR_OMDB #For movie thumbnail
MONGODB_URI=ADD_YOUR_MONGODB #For storing recommendations history
```
3.install the dependencies and run the project
```bash
npm install
npm run dev
```

4.Testing
```bash
npm run test:e2e //for e2e testing
npm run test:unit //for unit testing
npm run allure //to open allure report
```

## Specs
- Next.js - For FE and BE development
- AWS EC2 - For deployment
- LangChain - to compute embeddings for data enrichment
- Playwright - for e2e testing
- MongoDB - for storing recommendations history

## Flow
- User adds his description and links to movies he likes, and hits submit
- The user input is being validated:
    - Using prompt engineering techniques, we verify that the prompt is not harmful or malicious and that the user is not trying to exploit the system
    - The system limits the number of characters in the description to prevent the user from sending too much data
- Input data processing:
    - Using prompt engineering techniques, we wrap the user input with a prompt that will help the system understand the user's preferences
    - In case the user didn't provide links, the system will recommend movies based on the description using its pre-defined movie list(past 2021)
    - In case the user provided links:
        - The system will get the html of the links provided and extract the movie title and description from the html
        - The system will use the new data to add more data to pre-defined movie list.
        its done by computing the embeddings of the new data and store its vectors using LangChain
- Recommendations:
    - The system will validate that the response was successful and that the user received the recommendations that match his preferences
    - The system will display the recommendations to the user and attach the movie thumbnails from OMDB API
- History:
    - The system will store the general recommendations history in MongoDB
    - The user can view the history and see the movie thumbnails from OMDB API
    - Each history item is clickable and will show the relevant input data and its recommendation
