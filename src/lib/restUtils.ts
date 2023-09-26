import type { NextApiRequest, NextApiResponse } from 'next'
import prisma, {errorFormat} from "./prisma";

export async function processGetAndPost(dbEntity: string, req: NextApiRequest, res: NextApiResponse) {
    const { method} = req;

    switch(method) {
        case "GET":
            await handleGet(dbEntity, res);
            break;
        case "POST":
            await handlePost(dbEntity, req, res);
            break;
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

export async function handlePost(dbEntity: string, req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await prisma.cards.create({data: {...req.body}});

        res.setHeader("Content-Type", "application/json");
        res.status(200).end(JSON.stringify(data, null, "\t"));
    } catch(e) {
        res.status(400).end(errorFormat("ERROR: handlePost."));
    }
}

// processGetOnePutAndDelete
export async function processGetOnePutAndDelete(dbEntity: string, req: NextApiRequest, res: NextApiResponse){
    const { method } = req;

    switch(method) {
        case "GET":
            await handleGetOne(dbEntity, req, res);
            break;
        case "PUT":
            await handlePut(dbEntity, req, res);
            break;
        case "DELETE":
            await handleDelete(dbEntity, req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export async function handleGetOne(dbEntity: string, req: NextApiRequest, res: NextApiResponse) {
    try {
        const primaryKeyId = req?.query?.id?.toString() ?? "ID-REQUIRED-NOT-FOUND";
        const data = await prisma.cards.findMany({
            where: {id: primaryKeyId}
        });

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({id: primaryKeyId, title: "handleGetOne title"}, null, "\t"));
    } catch (e) {
        res.status(400).end(errorFormat("ERROR: handleGetOne."));
    }
}

export async function handlePut(dbEntity: string, req: NextApiRequest, res: NextApiResponse) {
    try {
        const primaryKeyId = req?.query?.id?.toString() ?? "ID-REQUIRED-NOT-FOUND";
        let loReqBody = {...req.body};
        delete loReqBody.id;
        
        const data = await prisma.cards.update({
            where: {id: primaryKeyId},
            data: {...loReqBody}
        });

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({id: primaryKeyId, title: "handlePut title"}, null, "\t"));
    } catch (e) {
        res.status(400).end(errorFormat("ERROR: handlePut."));
    }
}

export async function handleDelete(dbEntity: string, req: NextApiRequest, res: NextApiResponse) {
    try {
        const primaryKeyId = req?.query?.id?.toString() ?? "ID-REQUIRED-NOT-FOUND";        
        const data = await prisma.cards.delete({
            where: { id: primaryKeyId }
        });

        res.setHeader("Content-Type", "application/json");
        res.status(200).end(JSON.stringify(data, null, "\t"));
    } catch (e) {
        res.status(400).end(errorFormat("ERROR: handleDelete."));
    }
}