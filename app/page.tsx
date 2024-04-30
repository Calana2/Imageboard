import Link from "next/link";
import Institutional from "./ui/institutional";


export default function Home() {
  return (
    <main className="flex flex-col gap-96 justify-center items-center pb-10">
     <div className="flex flex-col items-center justify-center gap-3 mt-10">
      <h1 className="text-4xl font-bold underline">Welcome to K-Chan</h1>

      <div className="flex flex-col justify-center items-center">
       <h1 className="text-4xl font-bold">Boards</h1>
       <Link href="/b" className="text-lg font-semibold">/b/-Random</Link>
      </div>

     </div>
      <Institutional/>
    </main>
  );
}
