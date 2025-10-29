"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const HeaderText = [
  {
    header: "Example Hotel",
    subheader1: "ยินดีต้อนรับสู่การบริการที่พัก ที่คุณไม่เคยได้สัมผัสมาก่อน",
    subheader2: "พบกับประสบการณ์รูปแบบใหม่",
    button: "จองตอนนี้",
  },
];

const maintext = [
  {
    topic: "ห้องพัก",
    picture:
      "/designing-luxurious-bedroom-that-promotes-relaxation-comfort_848676-310-transformed.jpeg",
  },
  {
    topic: "ประสบการณ์",
    picture: "/370564672.jpg",
  },
  {
    topic: "สถานที่สำหรับจัดอีเว้นต์",
    picture: "/yorkhotel-wedding9361-hdr.jpg",
  },
];

export default function Home() {
  return (
    <div className="">
      <div className="relative  h-screen w-screen">
        <Image
          src="/Keemala-Phuket.jpg"
          alt="bg"
          width={1920}
          height={200}
          className="object-cover"
        />
        {HeaderText.map((item, index) => (
          <div
            key={index}
            className="absolute z-20 inset-0 flex flex-col items-center justify-start mt-20 gap-20"
          >
            <div className="font-bold text-white text-8xl">{item.header}</div>
            <div className="font-normal text-white text-6xl mt-10">
              {item.subheader1}
            </div>
            <div className="font-normal text-white text-6xl">
              {item.subheader2}
            </div>
            <a
              className=" px-10 py-4 text-white text-4xl rounded-full cursor-pointer mt-10"
              style={{ backgroundColor: "#192D5E" }}
            >
              {item.button}
            </a>
          </div>
        ))}
      </div>
      <div className="mt-[300px]">
      {maintext.map((item, index) => (
        <div className="" key={index}>
          <div className="text-8xl text-center mb-10 " style={{color:'#192D5E'}}>{item.topic}</div>
          <div className="relative w-full bg-amber-100 mb-40">
            <Image src={item.picture} alt="bg" width={900} height={800} />
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
