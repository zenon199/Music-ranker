import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '../lib/db';


const YT_REGEX = new RegExp("?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}")

const CreateStreamSchema = z.object({
	createrId: z.string(),
	url: z.string() //contain only youtube or spotify url
});

export async function POST(req: NextRequest) {
	try {
		const data = CreateStreamSchema.parse(await req.json());
		
		const isYt = YT_REGEX.test(data.url)
		if (!isYt) {
			return NextResponse.json({
				message: "Wrong YT url",
			}, {status: 411})
		}

		const extractedId = data.url.split("?v=")[1];

		await prismaClient.stream.create({
			dats: {
				userId: data.createrId,
				url: data.url,
				extractedId,
				type: "Youtube"

			}
		})
	} catch(e) {
		return NextResponse.json({
			message: "Error in creating stream",
		}, {status: 411})
	}

}
