"use client";
import { useFormStatus } from "react-dom";
import type { LoginState } from "../controllers/authController";
import { login } from "../actions/auth.action";
import { useActionState } from "react";

function LoginButton() {
  const { pending } = useFormStatus(); // hook นี้จะบอกว่าฟอร์มกำลังถูกส่งหรือไม่

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="border rounded-full  px-4 cursor-pointer"
      style={{ backgroundColor: "#192D5E", color: "#FFFFFF" }}
    >
      {pending ? "Logging in..." : "ยืนยัน"}
    </button>
  );
}

export default function SignIn() {
  // สถานะเริ่มต้นของฟอร์ม
  const initialState: LoginState | undefined = undefined;
  // เชื่อมฟอร์มกับ Server Action ด้วย useFormState
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div className="flex justify-center p-5">
      <div
        className="border-2 rounded-2xl  p-5 gap-4 w-1/4 "
        style={{ borderColor: "#192D5E" }}
      >
        <h1 className="text-center font-semisold text-2xl mb-4">
          เข้าสู่ระบบ/สมัครสมาชิก
        </h1>
        <form action={formAction} className="flex flex-col items-center gap-3">
          <div className="">
            <input
              type="email"
              placeholder="อีเมล"
              name="email"
              className="border-1 rounded-md ps-3"
              style={{ borderColor: "#192D5E" }}
            />
          </div>
          <div className="">
            <input
              placeholder="รหัสผ่าน"
              type="password"
              name="password"
              className="border-1 rounded-md ps-3"
              style={{ borderColor: "#192D5E" }}
            />
          </div>
          <div className="mt-2 flex justify-center gap-5 items-center">
            <h1 className="font-semisold text-2xl">ลืมรหัสผ่าน?</h1>

            <LoginButton/>
          </div>
          {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
          <a
            href={"/Register"}
            className="border rounded-full w-1/2 text-center"
            style={{ borderColor: "#192D5E" }}
          >
            สมัครสมาชิก
          </a>
          
        </form>
        <div className="flex justify-center mt-2"></div>
      </div>
    </div>
  );
}
