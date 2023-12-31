import type { NextApiRequest, NextApiResponse } from 'next';
import { processGetAndPost } from '@/lib/restUtils';
//import { dbEntity } from '@/types/card';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await processGetAndPost("cards", req, res);
}