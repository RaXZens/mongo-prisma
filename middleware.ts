import NextAuth from "next-auth";
import { authConfig } from "@/app/libs/auth.config";

// // // Middleware จะใช้แค่ config ที่จำเป็นจาก authConfig
// export default NextAuth(authConfig).auth;

// // // บอกให้ Middleware ทำงานกับเส้นทางเหล่านี้เท่านั้น


export default NextAuth(authConfig).auth;

export const config = {
  // matcher นี้จะให้ middleware ทำงานบนทุก path
  // (รวมถึง /login และ /)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};