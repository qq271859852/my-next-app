import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request) {
  try {
    const body = await request.json();
    const { num1, num2 } = body;

    if (typeof num1 !== "number" || typeof num2 !== "number") {
      return NextResponse.json(
        { error: "请输入有效的数字" },
        { status: 400 }
      );
    }

    const sum = num1 + num2;

    return NextResponse.json({ sum });
  } catch (error) {
    return NextResponse.json(
      { error: "请求处理失败" },
      { status: 500 }
    );
  }
} 