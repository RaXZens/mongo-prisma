import { auth } from "../libs/auth";
import { redirect } from 'next/navigation';
// import { getMyPosts } from '@/models/post.model'; // ตัวอย่าง

export default async function DashboardPage() {
  // ดึง session จาก Server โดยตรง
  const session = await auth();

  // Middleware ควรจะป้องกันไว้แล้ว แต่เป็นการป้องกันซ้ำอีกชั้น
  if (!session?.user?.id) {
    redirect('/Login');
  }

  // const myPosts = await getMyPosts(session.user.id); // <== นำ user.id ไปใช้งาน

  return (
    <div>
      <h1>Welcome to Dashboard!</h1>
      <p>Your Email: {session.user.email}</p>
      <p>Your User ID: {session.user.id}</p>
      {/* <div>{myPosts.map(post => <div key={post.id}>{post.title}</div>)}</div> */}
    </div>
  );
}