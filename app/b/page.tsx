"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import ThreadForm from '@/app/ui/threadForm';
import {ThreadContext} from '@/app/ui/threadForm';
import { threadFromDatabase} from '@/app/types/forms'
import Institutional from '@/app/ui/institutional';


export default function Page(){
// for the menu
 const [thread,setThread] = useState<boolean>(false); 
 const board = "Random";
 const dataToSend = {board};
 const getParams = new URLSearchParams(dataToSend).toString();

 const getThreads = async () => {
  const req = await fetch(`../api/boards?${getParams}`,{
   method:"GET",
  });
  const object = await req.json();

  // Formatted date
  object?.forEach((object: threadFromDatabase) =>  { 
   object.date = new Date(object.date).toLocaleString().replaceAll(","," ");
  });

  setThreads(object);
 }

// and the real threads
 const [threads, setThreads] = useState<undefined|threadFromDatabase[]>();

// for mobile apps
 const isMobile = useMediaQuery({maxWidth: 768});

// useEffect dependency
 const [refresh,setRefresh] = useState<boolean>(false); 

useEffect(()=>{
// ignorar las advertencias de los LSP, eso hace demasiado rapido el fetch
 getThreads();

 const interval = setInterval(() => { getThreads(); }, 10000); 
 
 return () => clearInterval(interval);

},[refresh]);



 return(
  <main className="">
   <div className="flex flex-col gap-2">

    {/* Board Name */}
     <h1 className="text-3xl font-bold text-center">
      /b/ - Random
     </h1>

    <div className="flex justify-center text-lg font-semibold">
    {/* Create Thread Button */}
     <button onClick={()=>{setThread(!thread)}} className="hover:text-white">
      Create Thread
     </button>
    </div>


    {/* Create Thread Form */}
   <ThreadContext.Provider value={{setThread, board, refresh, setRefresh}}>
     {thread ? <ThreadForm /> : null} 
    </ThreadContext.Provider>
   </div>

    {/* Threads */}
   <div className="flex flex-col justify-center align-center gap-3 p-3">
   { threads ? threads.map((thread: threadFromDatabase,idx: number)=>
    (<div key={idx} className="flex flex-col gap-5 p-2 bg-gray-400 border-2 border-black">
       
       <div className="flex gap-2 flex-col md:flex-row">
       {/* Image */}
      {thread.attached !== "" ?
        <div className="flex flex-col gap-3">
         <div className="relative w-full h-32 md:size-96 border-2 border-pink-600">
          <Image src={thread.attached} alt="img" fill={true} className="h-full"/>
         </div>
         <p className="text-center">{thread.attached.substring(
                                     thread.attached.lastIndexOf('/')+1,thread.attached.lenght)}</p>
        </div>
      : null }

        {/* Info */}
       <div>
        <div className="flex flex-col break-words md:flex-row md:text-lg">
         <span className="font-semibold p-4 text-base md:text-lg">{thread.title}</span>
         <span className="p-4 text-sm font-semibold md:text-lg">$ {thread.owner}</span>
         <span className="p-4 text-sm md:text-base">{thread.date} (Local)</span>
         <span className="p-4 text-sm md:text-base">#{thread.id}</span>
        </div>
        <div>
        { !isMobile ? (
           <p className="bg-gray-300 md:text-lg p-2" dangerouslySetInnerHTML={{__html:thread.comment}}>
           </p>
          )
           : null
        }
        </div>
       </div>

       </div> {/*el segundo div de threads*/}

       <div className="p-4 break-words">
        { isMobile ? ( 
           <p className="p-1 bg-gray-300 rounded-md" dangerouslySetInnerHTML={{__html:thread.comment}}>
           </p>
          ) : null} 
       </div>

     <div className="flex justify-end">
      <div className="bg-gray-400 p-4 w-32 rounded-md">
       <Link href={`/b/${thread.id}`} className="hover:text-white"> 
        Join Thread
       </Link>
      </div>
     </div>

     </div>)
   ) : null }
   </div>

   <Institutional/>
  </main>
 );
}
