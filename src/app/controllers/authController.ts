import { signIn } from '../libs/auth';
import { AuthError } from 'next-auth';


export type LoginState = {
  error?: string;
  success?:string;
};

export async function handleLogin(
  prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  try {
    // 1. Business Logic (Call NextAuth)
    await signIn('credentials', { ...Object.fromEntries(formData),redirectTo: '/dashboard'});
    return {}; // สำเร็จ (signIn จะ redirect เอง)
  } catch (error) {
    // 2. Error Handling
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }
    throw error; // โยน error อื่นๆ ที่ไม่ใช่ AuthError
  }
}