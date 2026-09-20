import { NextRequest, NextResponse } from "next/server";

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  if (!botToken || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variable");
    return NextResponse.json({ error: "support_not_configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  const isValid =
    name.length >= 2 &&
    name.length <= 100 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    message.length >= 10 &&
    message.length <= 3000;

  if (!isValid) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const text =
    "<b>Nouveau message support Signs</b>\n\n" +
    `<b>Nom :</b> ${escapeHtml(name)}\n` +
    `<b>Email :</b> ${escapeHtml(email)}\n\n` +
    escapeHtml(message);

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });

    if (!response.ok) {
      console.error("Telegram sendMessage failed", response.status, await response.text());
      return NextResponse.json({ error: "telegram_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram sendMessage request failed", error);
    return NextResponse.json({ error: "telegram_failed" }, { status: 502 });
  }
}
