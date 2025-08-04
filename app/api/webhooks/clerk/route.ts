import prismadb from "@/lib/prismadb";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const evt = await verifyWebhook(req);

    if (!process.env.CLERK_WEBHOOK_SECRET) {
      return new NextResponse("CLERCK WEBHOOK SECRET not configured", {
        status: 500,
      });
    }

    if (evt.type === 'user.created') {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;

      const user = await prismadb.user.create({
        data: {
          userId: id,
          email: email_addresses[0].email_address,
          username: username,
          firstName: first_name,
          lastName: last_name,
          photo: image_url
        }
      })

      return NextResponse.json({ message: "OK", user: user });
    }

    console.log(`Received webhook with ID ${evt.data.id} and event type of ${evt.type}`)
    console.log('Webhook payload:', evt.data)

    return new Response('Webhook received', { status: 200 })
  } catch (error) {
    
  }
}