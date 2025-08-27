"use client"
import About from "@/components/About";
import Contact from "@/components/Contact";
import Fotter from "@/components/Fotter";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Work from "@/components/Work";
import { useState, useEffect } from "react";

export default function Home() {

  const [isDarkMode, setisDarkMode] = useState(false)

  useEffect(()=>{
    if(localStorage.them === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme:dark)").matches)){
      setisDarkMode(true)
    }else{
      setisDarkMode(false)
    }
  },[])

  useEffect(() => {
    if(isDarkMode){
      document.documentElement.classList.add('dark')
      localStorage.theme = "dark"
    }else{
      document.documentElement.classList.remove('dark')
      localStorage.theme = ""
    }
  }, [isDarkMode])
      
  return (
  
    <>
      <Navbar isDarkMode={isDarkMode} setisDarkMode={setisDarkMode} />
      <Header isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode}  />
      <Services isDarkMode={isDarkMode}  />
      <Work  isDarkMode={isDarkMode}  />
      <Contact isDarkMode={isDarkMode}  />
      <Fotter isDarkMode={isDarkMode}  />
    </>
  );
}
