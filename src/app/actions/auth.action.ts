'use server'
import { handleLogin } from '../controllers/authController';

import type { LoginState } from '../controllers/authController';

export async function login(
  prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  // 2. ส่งต่อให้ Controller จัดการทั้งหมด
  return handleLogin(prevState, formData);
}