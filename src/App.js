
import './App.css'
import React,{useState,useEffect} from 'react'

let App =()=>{
  
  let [joke,setJoke] = useState({})
  
  let [jokeExist,setJokeExist] = useState(false)
  
  let [show,setShow]=useState('')
  
  useEffect(()=>{
    getJoke()
  },[])
  
 let getJoke = async ()=>{
   try {
     setShow('')
       let apiUrl = 'https://v2.jokeapi.dev/joke/Any?type=twopart' ;

     let res = await fetch(apiUrl)
     
     let data = await res.json()
     
     setJoke(data)
     setJokeExist(!jokeExist)
     
console.log(data)
} catch (e) {
     console.log(e)
   }
 }
 
 let showAns = ()=>{
   setShow('show')
   setJokeExist(!jokeExist)
 }
  
  return(
    <div className='bot_container'>
 <div className='joke'>
     <h2>{joke.setup}
     </h2>    
     <h3 className={show}> { joke.delivery }
     </h3>
     
     </div>
     
     <button onClick={jokeExist ? showAns: getJoke}>{jokeExist ? 'show' : 'New joke'}
     </button>
    </div>
    )
}
export default App