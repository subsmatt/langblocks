import type { NextApiRequest, NextApiResponse } from 'next'
import prisma, {errorFormat} from "./prisma";
//import { dbEntity } from '@/types/card';

export async function processGetAndPost(dbEntityType: string, req: NextApiRequest, res: NextApiResponse) {
    const { method} = req;

    switch(method) {
        case "GET":
            await handleGet(dbEntityType, res);
            break;
        case "POST":
            await handlePost(dbEntityType, req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export async function handleGet(dbEntityType: string, res: NextApiResponse) {
    let data;
    try {
        switch (dbEntityType) {
            case "cards": 
                data = await prisma.cards.findMany();
                break;
            case "cardattributes":
                data = await prisma.cardAttributes.findMany();
                break;
            case "changelogs":
                data = await prisma.changeLogs.findMany();
                break;
            default:
                break;                
        } 
        
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data ?? [], null, "\t"));
    } catch(e) {
        res.status(400).end(errorFormat("ERROR: handleGet."));
    }
}

export async function handlePost(dbEntityType: string, req: NextApiRequest, res: NextApiResponse) {
    console.log(`sms>handlePost dbEntityType[${dbEntityType}]`)
    let data;
    try {
        switch (dbEntityType) {
            case "cards": 
                data = await prisma.cards.create({data: {...req.body}});
                break;
            case "cardattributes":
                data = await prisma.cardAttributes.create({data: {...req.body}});
                break;
            case "changelogs":
                data = await prisma.changeLogs.create({data: {...req.body}});
                break;
            default:
                break;                
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).end(JSON.stringify(data, null, "\t"));
    } catch(e) {
        res.status(400).end(errorFormat("ERROR: handlePost."));
    }
}

// processGetOnePutAndDelete
export async function processGetOnePutAndDelete(dbEntityType: string, req: NextApiRequest, res: NextApiResponse){
    const { method } = req;

    switch(method) {
        case "GET":
            await handleGetOne(dbEntityType, req, res);
            break;
        case "PUT":
            await handlePut(dbEntityType, req, res);
            break;
        case "DELETE":
            await handleDelete(dbEntityType, req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export async function handleGetOne(dbEntityType: string, req: NextApiRequest, res: NextApiResponse) {
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

export async function handlePut(dbEntityType: string, req: NextApiRequest, res: NextApiResponse) {
    try {
        const primaryKeyId = req?.query?.id?.toString() ?? "ID-REQUIRED-NOT-FOUND";
        let loReqBody = {...req.body};
        delete loReqBody.id;
        
        let data;
        switch (dbEntityType) {
            case "cards": 
                data = await prisma.cards.update({
                    where: {id: primaryKeyId},
                    data: {...loReqBody}
                });
                break;
            case "cardattributes":
                data = await prisma.cardAttributes.update({
                    where: {id: primaryKeyId},
                    data: {...loReqBody}
                });
                break;
            default:
                break;                
        }

        // const data = await prisma.cards.update({
        //     where: {id: primaryKeyId},
        //     data: {...loReqBody}
        // });

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({id: primaryKeyId, title: "handlePut title"}, null, "\t"));
    } catch (e) {
        res.status(400).end(errorFormat("ERROR: handlePut."));
    }
}

export async function handleDelete(dbEntityType: string, req: NextApiRequest, res: NextApiResponse) {
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