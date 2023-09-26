import { processGetOnePutAndDelete } from '@/lib/restUtils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await processGetOnePutAndDelete("cards", req, res);
}