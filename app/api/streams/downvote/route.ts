import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "../../lib/db";


const DownvoteSchema = z.object({
    streamId: z.string(),
})
export async function POST(req: NextRequest) {

    const session = await getServerSession();

    if (!session?.user?.email) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, { status: 403 })
    }
// You can rid of DB call
    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email?? ""
        }
    })

    if (!user) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, { status: 403 })
    }

    try {
        const data = DownvoteSchema.parse(await req.json())
        await prismaClient.upvote.delete({
            where: {
                userId_streamId: {
                    userId: user.id,
                    streamId: data.streamId
                }
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error in upvoting"
        }, { status: 403 })
    }

    
}