import { NextRequest, NextResponse } from "next/server";

const PROSPECT_PASSWORDS: Record<string, string> = {
  "patricia-bright": "patricia2026",
};

export async function POST(request: NextRequest) {
  try {
    const { password, slug } = (await request.json()) as {
      password: string;
      slug: string;
    };

    const expectedPassword = PROSPECT_PASSWORDS[slug];

    if (!expectedPassword || password !== expectedPassword) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(`prospect_auth_${slug}`, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
