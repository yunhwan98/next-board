import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(request: any) {
  const session = await getToken({ req: request });

  if (request.nextUrl.pathname.startsWith("/write")) {
    if (session == null) {
      return NextResponse.redirect(
        new URL("http://localhost:3000/api/auth/signin")
      );
    }
  }

  // '/list'로 시작하는 접속이 있을 경우
  if (request.nextUrl.pathname.startsWith("/list")) {
    //현재 유저의 os정보 알아내기
    console.log(new Date());
    console.log(request.headers.get("sec-ch-ua-platform"));
    return NextResponse.next();
  }
}
