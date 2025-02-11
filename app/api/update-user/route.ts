import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "No user id" }, { status: 401 })
    }
    const data = await req.json();
    const updateUser = await db.user.update({
      where: { id: userId },
      data,
    })
    return NextResponse.json(updateUser)
  } catch (error) {
    return NextResponse.json({ message: "Error Update User", error }, { status: 500 })
  }
}