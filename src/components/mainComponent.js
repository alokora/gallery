//require('dotenv').config();
import React, { useState,useEffect } from "react";
import './mainComponent.css';
import { Button,Switch } from "@mui/material";
import axios from 'axios';
import Cards from './cards';
import { createTheme ,ThemeProvider} from '@mui/material/styles';
import {useMediaQuery} from './useMediaQuery';




const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#141414',
      contrastText: 'white',
    },
    neutral2: {
      main: 'rgb(250, 250, 250)',
      contrastText: 'gray',
    },
  },
});


const MainComponent=()=>{
  const isBiggerScreen = useMediaQuery('(min-width: 500px)');
  const handleChange=()=>{
    setIsLightMode(!isLightMode);
   console.log("hey")
    if(!isLightMode){
      document.documentElement.style.setProperty("--text-color", "black");
      document.documentElement.style.setProperty("--background-color", "white")
      document.documentElement.style.setProperty("--background-color2", "white");
      document.documentElement.style.setProperty("--border-color", "gray")

    }else{
      document.documentElement.style.setProperty("--text-color", "white");
      document.documentElement.style.setProperty("--background-color", "rgb(35,35,35)")
      document.documentElement.style.setProperty("--background-color2", "rgb(20,20,20)");
      document.documentElement.style.setProperty("--border-color", "transparent")
    }
   

  }
  const [isLightMode,setIsLightMode]=useState(false);
  const [imgs,setImgs]=useState();
  const [searchQuery,setSearchQuery]=useState('');
  let array2;
 
  const searchImgs=async(query)=>{
    try{
      console.log("QUERY",query);
      const imagelist=await axios.get( `https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=1`,{
        headers:{
          Authorization: 'Client-ID qMpGYPhgMo0AAmzlK1BG-10Lg-jrjQPffmxpyCr5GCg'
        }
      });
      const array1=imagelist.data.results.map((res=>{
        return {
          id:res.id,srcs:res.urls,alt:res.lt_description,likes:res.likes,user:res.user
        }
      }));
      array2=array1.map((res,index)=>{ return <Cards id={res.id} key={res.id} src={res.srcs} alt={res.alt} likes={res.likes} user={res.user} />})
      console.log(array2);
      setImgs(array2);
    }catch(e){
      console.log("Error in api",e);
    }
  }



  
  const initial=async()=>{
    try{
      const imagelist=await axios.get('https://api.unsplash.com/search/photos?query=tree&per_page=20&page=1',{
        headers:{
          Authorization: 'Client-ID qMpGYPhgMo0AAmzlK1BG-10Lg-jrjQPffmxpyCr5GCg'
        }
      });
      // const array=imagelist.data.results
      const array1=imagelist.data.results.map((res=>{
        return {id:res.id,srcs:res.urls,alt:res.lt_description,likes:res.likes,user:res.user}
      }));
      array2=array1.map((res,index)=>{ return <Cards id={res.id} key={res.id} src={res.srcs} alt={res.alt} likes={res.likes} user={res.user} />})
      console.log(array1);
      setImgs(array2);
    }catch(e){
      console.log("Error in api",e);
    }
    
  }
  useEffect(()=>{
    initial();
  },[])  
    return (
        <div>
           <div className="topTab">
               <div className='imgGallery' style={{fontSize:'30px',fontWeight:400}}>Image Gallery</div>
               <div className="club" style={{display:'flex',justifyContent:'center'}}>
               <div  className="search" ><input style={{width:(isBiggerScreen?'300px':'250px'),height:'100%',backgroundColor:(isLightMode?'rgb(230,230,230)':'gray'),color:(isLightMode?'black':'white'),borderRadius:'0.4rem',border:'none',paddingLeft:'15px'}} id="imgName" value={searchQuery} onChange={e=>{setSearchQuery(e.target.value);console.log(searchQuery)}} type="text" placeholder=" search here.." /></div>&nbsp;&nbsp;
               <div className="searchBtn">
                 <ThemeProvider theme={theme}>
                 <Button variant="contained" onClick={()=>searchImgs(searchQuery)} color={isLightMode?"neutral2":'neutral'}>Search</Button>
                 </ThemeProvider>
                </div>
               </div>
      
              <div>
              <Switch
                color="default"
                checked={isLightMode}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              /> <span style={{fontSize:'1.1rem'}}>Change Mode</span>
              </div>
           </div>
           <div className="midSection"></div>
           {imgs}
        </div>
    )
}

export default MainComponent ;