import {useContext, createContext, useState} from 'react';
import {commentForm, commentContext} from '@/app/types/forms';
import { useMediaQuery } from 'react-responsive';

export const CommentContext = createContext<commentContext>({setComment:()=>{},board:"",idThread:null,refresh:false,setRefresh:()=>{}});

export default function CommentForm(){
const {setComment, board, idThread, refresh, setRefresh} = useContext(CommentContext);
const [form,setForm] = useState<commentForm>({name:"anonymous",comment:""});
const [file,setFile] = useState<File|undefined>(undefined);
const isMobile = useMediaQuery({maxWidth: 768});

const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
 setForm(previous=>(
          {...previous,[e.target.name]:e.target.value}
        )); 
}


// Add comment to the database

const onSubmit = () => {
 const data = {...form, board, idThread, file};
 const formData = new FormData();
 let lineBreaker = data.comment.replaceAll('\n','<br/>');

  formData.append("name", String(data.name));
  formData.append("idThread", String(data.idThread));
  formData.append("comment", String(lineBreaker));
  formData.append("board", String(data.board));
  
  if (file) {
    formData.append("file",file);
  }
  


 const request = async () => {
  try {
   const res = await fetch('../api/threads',{
   method: 'POST',
   body: formData,
   });
   if(res.ok){
    console.log('Saved');
     console.log(data);
     console.log(formData);
    setComment(false);
    setRefresh(!refresh);
   }
  } catch (error) {
   console.log(error);
  }
 }  
 request();
}

 return(
  <div className="flex justify-center text:sm md:text-base">
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
    <div className="flex flex-col gap-5">
     <label htmlFor="comment">Comment:</label>
     <textarea name="comment"
               id="comment"
               rows={4}
               cols={isMobile ? 20 : 40}
               required
               className="md:p-2 p-1"
               style={{border:"1px solid black", whiteSpace:"pre-line"}}
               onChange={onChange}
     />
    </div>
      <input type="file"
             name="file"
             onChange={(e)=>setFile(e.target.files?.[0])}
      />
    <div className="flex flex-row justify-between gap-2">
     <button type="button" 
      onClick={()=>setComment(false)}>
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

