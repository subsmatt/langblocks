import { processGetOnePutAndDelete } from '@/lib/restUtils';
import type { NextApiRequest, NextApiResponse } from 'next';
//import { dbEntity } from '@/types/card';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await processGetOnePutAndDelete("cards", req, res);
}