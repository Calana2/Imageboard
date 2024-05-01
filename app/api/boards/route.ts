import { prisma } from '@/prisma/prisma'
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function POST(req: NextRequest){
  const formData = await req.formData();
  const name = String(formData.get("name"));
  const title = String(formData.get("title"));
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
  switch(board){

   case "Random":
    const creation = await prisma.bT.create({
     data:{
      owner: name,
      title: title || null,
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
 // Name of the board
 const board = req.url.slice(req.url.indexOf('=')+1,req.url.length);

 try {
  switch(board) {

   case "Random":
    const threads = await prisma.bT.findMany({
     orderBy:{
     },
    });
    return NextResponse.json(threads);

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
