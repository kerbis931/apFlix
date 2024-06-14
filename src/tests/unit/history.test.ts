import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';

import handler from '@app/pages/api/history';
import SearchHistory from '@app/pages/api/models/SearchHistory';
import dbConnect from '@app/pages/api/utils/db/dbConnect';

jest.mock('../../pages/api/utils/db/dbConnect', () => jest.fn());

interface ExtendedRequest extends NextApiRequest {
  env: typeof process.env;
}

describe('/api/history API Endpoint', () => {
  beforeAll(async () => {
    await dbConnect();
  });

  it('should return search recommendations history', async () => {
    const { req, res } = createMocks<ExtendedRequest, NextApiResponse>({
      method: 'GET'
    });

    await SearchHistory.create({ userDescription: 'test', suggestion: 'test suggestion' });

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.history).toHaveLength(1);
    expect(data.history[0].userDescription).toBe('test');
    expect(data.history[0].suggestion).toBe('test suggestion');
  });
});
