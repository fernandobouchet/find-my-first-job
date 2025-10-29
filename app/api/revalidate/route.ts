import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const path = req.nextUrl.searchParams.get("path") || "/";

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error revalidating", error: err },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
export async function PUT() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
export async function DELETE() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
