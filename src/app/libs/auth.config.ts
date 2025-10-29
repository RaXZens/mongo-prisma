import type { NextAuthConfig } from "next-auth";
export const authConfig = {
  // 1. บอกระบบว่าหน้า login ของเราอยู่ที่ไหน
  pages: {
    signIn: "/Login",
  },

  callbacks: {
    // 2. นี่คือ "กฎ" ที่จะทำงานทุกครั้งที่มีคนเข้าเว็บ
    authorized({ auth, request: { nextUrl } }) {
      // 3. ตรวจสอบสถานะ: ล็อกอินแล้วหรือยัง?
      // (!!auth?.user จะเป็น true เมื่อ user object มีค่า)
      const isLoggedIn = !!auth?.user;

      // 4. ตรวจสอบว่า: กำลังจะไปหน้า dashboard หรือไม่?
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      
      if (isOnDashboard) {
        if (isLoggedIn) return true; // ✅ ถ้าล็อกอินแล้ว และจะเข้า dashboard -> อนุญาต
        return false; // ❌
        //  ยังไม่ล็อกอินแต่จะเข้า dashboard -> ไม่อนุญาต (จะถูก redirect ไปหน้า signIn)
      } else if (isLoggedIn) {
        // ✅ ถ้าล็อกอินแล้ว แต่พยายามเข้าหน้าอื่น (เช่น /login, /register, /)
        // ให้ส่งไปที่ /dashboard แทน

        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // ✅ กรณีอื่นๆ (ยังไม่ล็อกอิน และไม่ได้จะเข้า dashboard) -> อนุญาตทั้งหมด
      return true;
    },
  },

  providers: [], // Providers จะถูกกำหนดในไฟล์หลัก (lib/auth.ts)
} satisfies NextAuthConfig;
