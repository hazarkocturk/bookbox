import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {

  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    throw new Error("Clerk webhook signing secret is not set, please set it in your environment variables.");
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing headers" }, { status: 400 });
  }

  const payload = await req.json()
  const body = JSON.stringify(payload);
  console.log("Received webhook event:", body);

  let evt: WebhookEvent
  
  try {
    evt = wh.verify(body, {
      "svix-id": svixId ,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses[0]?.email_address || "unknown@example.com";

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 200 });
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: id,
        email: email || "unknown@example.com",
        firstName: first_name || "Unknown",
        lastName: last_name || "User",
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
      },
      { status: 201 }
    );
  }

  return NextResponse.json({ message: "Event not handled" }, { status: 200 });
}
