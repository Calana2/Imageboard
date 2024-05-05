"use client"

import { useEffect, useState } from "react";
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { usePathname } from 'next/navigation';

import CommentForm from "@/app/ui/commentForm";
import { CommentContext } from "@/app/ui/commentForm";
import { threadFromDatabase, commentFromDatabase } from "@/app/types/forms"
import Institutional from '@/app/ui/institutional';



export default function Page(){
 const [comment,setComment] = useState<boolean>(false); 
 const [thread, setThread] = useState<undefined|threadFromDatabase>();
 const [comments, setComments] = useState<undefined|commentFromDatabase[]>();

// for mobile apps
 const isMobile = useMediaQuery({maxWidth: 768});
// useEffect dependency
 const [refresh,setRefresh] = useState<boolean>(false); 

 const board = "Random";
 const path = usePathname();
 const idThread = path.slice(path.lastIndexOf('/')+1,path.length);

const serveThread = async () => {
  const req = await fetch(`../api/threads?idThread=${idThread}&board=${board}`,{
   method:"GET",
  });
  const object = await req.json();
  setThread(object.thread);
  setComments(object.comments);
}

useEffect(()=>{
 serveThread();
},[refresh]);

return (
  <main>
    <div className="flex flex-col gap-4">

      {/* DIV 1*/}
      <div className="flex flex-col gap-2">
        {/* Board Name */}
        <h1 className="text-3xl font-bold text-center">
          /b/ - Random: Thread[{idThread}]
        </h1>
        <div className="flex justify-center text-lg font-semibold">
          {/* Create Comment Button */}
          <button onClick={() => { setComment(!comment) }} className="hover:text-white">
            Write a comment
          </button>
        </div>
        {/* Create Comment Form */}
        <CommentContext.Provider value={{ setComment, board, idThread, refresh, setRefresh }}>
          {comment ? <CommentForm /> : null}
        </CommentContext.Provider>
      </div>
      {/* END OF DIV 1*/}
      

      <div className="flex flex-col justify-center align-center gap-3 p-3">
        {thread ? (
          <div className="flex flex-col gap-5 p-2 bg-gray-400 border-2 border-black">
            <div className="flex gap-2 flex-col md:flex-row">

              {/* Image */}
             {thread.attached !== "" ?
              <div className="flex flex-col gap-2">
                <div className="relative w-full h-32 md:size-96">
                  <Image src={thread.attached} alt="img" fill={true} className="h-full"/>
                </div>
                <p className="text-center">{thread.attached.substring(thread.attached.lastIndexOf('/') + 1, thread.attached.length)}</p>
              </div>
              : null
              }

              {/* Info */}
              <div>

                <div className="flex flex-col break-words md:flex-row">
                  <span className="font-semibold p-4 text-base md:text-lg">{thread.title}</span>
                  <span className="p-4 text-sm font-semibold md:text-base">$ {thread.owner}</span>
                  <span className="p-4 text-sm md:text-base">{thread.date} (Local)</span>
                  <span className="p-4 text-sm md:text-base">#{thread.id}</span> 
                </div>

                <div className={!isMobile ? 'bg-gray-300 text-lg' : ''}>
                  { !isMobile ? (
                   <p dangerouslySetInnerHTML={{__html:thread.comment}} className="p-2">
                   </p>
                  ) : null }
                </div>

       <div className="p-4 break-words md:bg-gray-400">
        { isMobile ? ( 
                   <p dangerouslySetInnerHTML={{__html:thread.comment}} className="p-2 bg-gray-300 rounded-md">
                   </p>
          ) : null }
       </div>

              </div>
            </div>
          </div>
        ) : null }
      </div>

   {/* COMMENTS */}
     <div className="flex flex-col justify-center align-center gap-3 p-3">

      {comments ? comments.map((comment: commentFromDatabase, idx: number) => ( 
        <div key={idx} className="flex flex-col gap-5 p-2 bg-gray-400 border-2 border-black">

            <div className="flex gap-2 flex-col md:flex-row">

              {/* Image */}
            {comment.attached !== "" ?
              <div className="flex flex-col gap-3">
                <div className="relative w-full h-32 md:size-96">
                  <Image src={comment.attached} alt="img" fill={true} className="h-full" />
                </div>
                <p className="text-center">{comment.attached.substring(comment.attached.lastIndexOf('/') + 1, comment.attached.length)}</p>
              </div>
             : null }
               
               {/* TEXT */}
             <div className="flex flex-col">
                <div className="flex flex-col break-words md:flex-row">
                  <span className="p-4 text-sm font-semibold md:text-base">$ {comment.owner}</span>
                  <span className="p-4 text-sm md:text-base">{comment.date} (Local)</span>
                  <span className="p-4 text-sm md:text-base">#{comment.id}</span> 
                </div>

                <div className={!isMobile ? 'bg-gray-300 text-lg' : ''}>
                  { !isMobile ? (
                   <p dangerouslySetInnerHTML={{__html:comment.comment}} className="p-2">
                   </p>) 
                  : null }
                </div>
       <div className="p-4 break-words">
        { isMobile ? ( 
                   <p dangerouslySetInnerHTML={{__html:comment.comment}} className="p-2 rounded-md bg-gray-300">
                   </p>
          ) : null}
       </div>
             </div>
            </div>
        </div>
       ))
      : null}
     </div>
    </div>
  <Institutional/>
  </main>
);
}

