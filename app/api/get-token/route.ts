import { auth } from "@/auth";
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(req: Request) {
  const secret = process.env.JWT_SECRET as string
  const session = await auth();
  const user = session?.user;
  try {
    if (!user) {
      return new NextResponse("Unauthorized User", { status: 401 })
    }
    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, secret, { expiresIn: '4h' });
    if (!token) {
      return new NextResponse("Unauthorized user", { status: 401 });
    } else {
      return NextResponse.json(token)
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
};
