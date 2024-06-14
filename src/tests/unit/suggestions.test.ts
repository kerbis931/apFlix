import { NextApiRequest, NextApiResponse } from 'next';

import handler from '@app/pages/api/suggestionsEngine';
import { saveLastSuggestionToDb } from '@app/pages/api/utils/db/saveLastSuggestionToDb';
import { fetchOpenAISuggestions } from '@app/pages/api/utils/openAi/fetchOpenAISuggestions';

jest.mock('@app/pages/api/utils/openAi/fetchOpenAISuggestions');
jest.mock('@app/pages/api/utils/db/saveLastSuggestionToDb');
jest.mock('axios');

describe('suggestions API', () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;

  beforeEach(() => {
    req = {
      body: {
        userDescription: 'Test description',
        extractedImdbUrls: ['https://www.imdb.com/title/tt12747748/']
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('should return a suggestion when given valid input', async () => {
    (fetchOpenAISuggestions as jest.Mock).mockResolvedValue('Mocked suggestion');

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ suggestion: 'Mocked suggestion' });
    expect(saveLastSuggestionToDb).toHaveBeenCalledWith('Mocked suggestion', 'Test description');
  });

  it('should return 400 if userDescription is missing', async () => {
    req.body.userDescription = '';

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User description is required' });
  });

  it('should return 500 if an error occurs', async () => {
    (fetchOpenAISuggestions as jest.Mock).mockRejectedValue(new Error('Mocked error'));

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while fetching the recommendation' });
  });
});
