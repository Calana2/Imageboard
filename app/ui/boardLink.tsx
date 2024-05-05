import Link from "next/link"

export default function BoardLink({to, text}: {to:string, text:string}){
 return(
  <Link href={to} className="text-lg font-semibold bg-amber-500 p-2 rounded-md hover:text-white"
   style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 1px 2px"}}>
   {text}
  </Link>
 );
}
