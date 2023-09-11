import type { NextApiRequest, NextApiResponse } from 'next'
import prisma, {errorFormat} from "./prisma";

export async function processGetAndPost(dbEntity: string, req: NextApiRequest, res: NextApiResponse) {
    const { method} = req;

    switch(method) {
        case "GET":
            await handleGet(dbEntity, res);
            break;
        // case "POST":
        //     await handlePost(dbEntity, req, res);
        //     break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export async function handleGet(dbEntity: string, res: NextApiResponse) {
    
    try {
        const data = await prisma.cards.findMany();
        
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data ?? [], null, "\t"));
    } catch(e) {
        res.status(400).end(errorFormat("ERROR: handleGet."));
    }
}