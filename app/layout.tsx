
import type { Metadata } from "next";
import "@uploadthing/react/styles.css"
import "./globals.css";

export const metadata: Metadata = {
  title: "23Chan",
  description: "Generated by create next app",
  icons:{
   icon: [
    {
     url:'/images/favicon.ico',
     href:'/images/favicon.ico',
    }
   ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body style={{backgroundColor: "#009944", 
                    backgroundAttachment: "fixed",

                    }}>
       {children}
      </body>
    </html>
  );
}
