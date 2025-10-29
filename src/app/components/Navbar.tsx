"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";


function Navbar() {
  
  const { data: session, status } = useSession();
  const handlelogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/Login" });
  };

  console.log("--- [CLIENT] Navbar Session:", status);
  return (
    <div>
      <div
        className="flex justify-center gap-20 p-5 items-center"
        style={{ backgroundColor: "#192D5E", color: "#730000" }}
      >
        <div className="flex gap-2 text-white ">
          <div className="">Hambergur</div>
          <div className="">Logo</div>
        </div>
        <input
          placeholder="ค้นหา"
          className="border px-100 py-1 rounded-2xl "
          style={{ backgroundColor: "#D9D9D9", color: "#0D1833" }}
        />

        {session ? (
          <>
            <div>ยินดีต้อนรับ, {session.user?.email}</div>
            <button onClick={() => handlelogout()}>Sign Out</button>
          </>
        ) : (
          <>
            <div
              className="border px-4 py-1 text-white rounded-2xl cursor-pointer"
              style={{ backgroundColor: "#0D1833" }}
            >
              <Link href={"/Login"}>เข้าสู่ระบบ</Link>
            </div>
          </>
        )}
      </div>

      <div
        className="bg-white flex justify-center gap-10 pt-1"
        style={{ color: "#0D1833" }}
      >
        <a href={"/"} className="cursor-pointer">
          หน้าแรก
        </a>
        <a className="cursor-pointer">สินค้า</a>
        <a className="cursor-pointer">ติดต่อเรา</a>
        <a className="cursor-pointer">เกี่ยวกับเรา</a>
      </div>
    </div>
  );
}

export default Navbar;
