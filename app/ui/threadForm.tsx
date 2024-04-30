import {useContext, createContext, useState} from 'react';
import {threadForm, threadContext} from '@/app/types/forms';
import { useMediaQuery } from 'react-responsive';



export const ThreadContext = createContext<threadContext>({setThread:()=>{},board:"",refresh:false,setRefresh:()=>{}});

export default function ThreadForm(){
const {setThread, board, refresh, setRefresh} = useContext(ThreadContext);
const [form,setForm] = useState<threadForm>({name:"anonymous",title:"",comment:""});
const [file,setFile] = useState<File|undefined>(undefined);
const isMobile = useMediaQuery({maxWidth: 768});

const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
 setForm(previous=>(
          {...previous,[e.target.name]:e.target.value}
        )); 
}


// Add thread to the database

const onSubmit = () => {
// Problema aqui, al parecer un tipo File no puede enviarse en formato JSON, asi que usare formData
 const data = {...form,board,file};
 const formData = new FormData();
 let lineBreaker = data.comment.replaceAll('\n','<br/>');


  formData.append("name", String(data.name));
  formData.append("title", String(data.title));
  formData.append("comment", String(lineBreaker));
  formData.append("board", String(data.board));


  if (file) {
    formData.append("file", file);
  }

 const request = async () => {
  try {
   const res = await fetch('../api/boards',{
   method: 'POST',
   body: formData,
   });
   if(res.ok){
    console.log('Saved');
    setThread(false);
    setRefresh(!refresh);
   }
  } catch (error) {
   console.log(error);
  }
 }  

 request(); 
}

 return(
  <div className="flex justify-center text-sm md:text-base">
   <form className="flex flex-col gap-2 mt-10 p-5 w-72 md:w-1/3 bg-gray-400" style={{border:"2px solid black"}} action={onSubmit}>
    <div className="flex flex-col md:flex-row md:gap-5">
     <label htmlFor="name">Name:</label>
     <input type="text" 
            name="name"
            id="name"
            defaultValue="anonymous"
            className="md:p-2 p-1"
            style={{border:"1px solid black"}}
            onChange={onChange}
     />
    </div>
    <div className="flex flex-col md:flex-row md:gap-8">
     <label htmlFor="title">Title:</label>
     <input type="text" 
            name="title"
            id="title"
            className="md:p-2 p-1"
            style={{border:"1px solid black"}}
            onChange={onChange}
     />
    </div>
    <div className="flex flex-col md:gap-5">
     <label htmlFor="comment">Comment:</label>
     <textarea name="comment"
               id="comment"
               rows={4}
               cols={isMobile ? 20 : 40}
               required
               className="md:p-2 p-1"
               style={{border:"1px solid black"}}
               onChange={onChange}
     />
    </div>
      <input type="file"
             name="file"
             onChange={(e)=>setFile(e.target.files?.[0])}
      />
    <div className="flex flex-row justify-between gap-2">
     <button type="button" 
      onClick={()=>setThread(false)}>
      Close
     </button>
     <button type="submit">
     Send
     </button>
    </div>
   </form>
  </div>
 );
}
