import type { NextApiRequest, NextApiResponse } from 'next';
import { processGetAndPost } from '@/lib/restUtils';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await processGetAndPost("tags", req, res);
}