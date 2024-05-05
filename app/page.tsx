import Link from "next/link";
import Image from "next/image"

import Portada from "@/public/portada.jpg"
import Institutional from "./ui/institutional";
import BoardLink from "./ui/boardLink";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col gap-96 justify-center items-center pb-10">
     <div className="flex flex-col items-center justify-center gap-3 mt-10">
      <h1 className="text-4xl font-bold underline">Welcome to 23-Chan</h1>
      <Suspense fallback={<p>Loading...</p>}>
       <Image alt="mainIMG" width={300} height={200} src={Portada} />
      </Suspense>

      <div className="flex flex-col justify-center items-center">
       <h1 className="text-4xl font-bold">Boards</h1>
       <BoardLink to="/b" text="/b/-Random"/>
      </div>

     <div className="rounded-lg p-1 top-1 right-2 absolute md:top-5 md:right-10 md:text-lg md:p-2 md:rounded-md bg-purple-600 font-bold hover:text-white" style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}>
      <Link href="/rules"> Rules </Link>
     </div>

     </div>
      <Institutional/>
    </main>
  );
}
