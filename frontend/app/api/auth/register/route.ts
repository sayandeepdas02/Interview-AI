import { prisma } from "@/lib/prisma"
import { userRegisterSchema } from "@/lib/validations/auth"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"
import * as z from "zod"

export async function POST(req: Request) {
    try {
        const json = await req.json()
        const body = userRegisterSchema.parse(json)

        const exists = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        })

        if (exists) {
            return new NextResponse("User already exists", { status: 409 })
        }

        const hashedPassword = await hash(body.password, 10)

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                company: body.company,
                password: hashedPassword,
            },
        })

        // Remove password from response
        const { password, ...result } = user

        return NextResponse.json(result, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 422 })
        }

        return new NextResponse(null, { status: 500 })
    }
}
