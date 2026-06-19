import  { useState }  from  'react' 
import  reactLogo  from  './assets/react.svg' 
import  viteLogo  from  './assets/vite.svg' 
import  heroImg  from  './assets/hero.png' 
import  './App.css' 
import  Invite  from  './components/Invite' 
function  App() { 
return  ( 
<div  className = 'container' > 
<h1> Student Information </h1> 
<Invite  name = "Sarvagy  Parashar"  branch = { "Computer  Science" } 
marks = { 85 } /> 
<Invite  name = "Sourabh Verma"  branch = { "Computer  Science" }  marks = { 75 } /> 
<Invite  name = "Vedansh Tyagi"  branch = { "Computer  Science" }  marks = { 95 } /> 
<h6> Sarvagy Parashar </h6> 
</div> 
) 
} 
export  default  App