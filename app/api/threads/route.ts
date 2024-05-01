import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest){
  const formData = await req.formData();
  const name = String(formData.get("name"));
  const idThread = String(formData.get("idThread"));
  const comment = String(formData.get("comment"));
  const board = String(formData.get("board"));
  const file = formData.get("file") as unknown as File;


// Creating a file
let url: string | null = null;
if(file !== undefined && file !== null){
 const bytes = await file.arrayBuffer();
 const buffer = Buffer.from(bytes);
 const path = join(process.cwd(),"public/uploaded",file.name);
 url = `/uploaded/${file.name}`;
 try {
  await writeFile(path,buffer);
 } catch(error) { 
  console.log(error);
 } 
}


 try {
  switch(board) {

   case "Random":
    const creation = await prisma.bC.create({
     data:{
      idThread: Number(idThread),
      owner: name,
      comment: comment,
      attached: url,
     },
    });
    if(creation !== null){
     return NextResponse.json({
      status:"success",
     });
    } else { 
     throw new Error("Something went wrong.");
    }
 
   default: throw new Error("Unknow board.");
  }
 } catch(error) {
  console.log(error);
  return NextResponse.json({
   status:"error",
   message:`${error}`,
  })
 }
}


// For data representation
export async function GET(req: NextRequest){
 const params = req.nextUrl.searchParams;

 try {
  switch(params.get('board')) {

   case "Random":
    const thread = await prisma.bT.findUnique({
     where:{
      id:Number(params.get('idThread')),
     }
    });

    const comments = await prisma.bC.findMany({
     where:{
      idThread:Number(params.get('idThread')),
     }
    });

    const object = {thread, comments};
    return NextResponse.json(object);

    default:
     return NextResponse.json({
      status:"error",
      message:'Board does not found',
     });
  }

 } catch(error) {
  console.log(error);
  return NextResponse.json({
   status:"error",
   message:`${error}`,
  });
 }
}





  
