import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { stripe } from "@/lib/stripe";
import { r2, R2_BUCKET_NAME, EBOOK_OBJECT_KEY } from "@/lib/r2";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "missing_session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "payment_not_completed" }, { status: 403 });
    }
  } catch (error) {
    console.error("Stripe session verification failed", error);
    return NextResponse.json({ error: "invalid_session" }, { status: 400 });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: EBOOK_OBJECT_KEY,
      ResponseContentDisposition: 'attachment; filename="signs-ebook.pdf"',
    });

    // URL de courte durée : le lien n'a besoin de vivre que le temps de la redirection.
    const url = await getSignedUrl(r2, command, { expiresIn: 60 });

    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Failed to generate R2 signed URL", error);
    return NextResponse.json({ error: "file_not_found" }, { status: 500 });
  }
}
