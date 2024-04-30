import { Metadata } from 'next';
import  Link  from 'next/link';

export const metadata: Metadata = {
  title: "Kchan/Board:Random",
  description: "Generated by create next app",
};

export default function Layout({children} : {children: React.ReactNode}){ 
 return(
  <main className="">
      <nav className="flex justify-around gap-4 text-cyan-200 w-full font-bold bg-black fixed z-50">
       <Link href="/">Main</Link>
       <Link href="/b">/b/</Link>
      </nav>
  <div className="p-10">
   {children}
  </div>
  </main>
 );
} 

