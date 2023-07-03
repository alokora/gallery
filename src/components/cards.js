//require('dotenv').config();
import React, { useState,useEffect } from "react";
import './mainComponent.css';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useMediaQuery} from './useMediaQuery';

const Cards=({id,src,alt,likes,user})=>{

  const isBiggerScreen = useMediaQuery();

  const [open,setOpen]=useState(false);
  const [open2,setOpen2]=useState(false);
  useEffect(()=>{
    console.log("inside cards",user,isBiggerScreen);

    
    
  },[])
 
 
  const handleClose=()=>{
    setOpen(false);
  }
  const style = {
    container: isBiggerScreen => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'transparent',
    border: 'none',
    width:isBiggerScreen?'500px':'350px',
    height:isBiggerScreen?'600px':'580px',
    boxShadow:0,
    p:0,
    })
  };
  
  return(
    <div className="cardDiv">
      <Modal
        open={open}
        onClose={handleClose}
        style={{backgroundColor:'rgba(0, 0, 0, 0.709)'}}
      >
        <div>
          <Box sx={{ ...style.container(isBiggerScreen)}}
            onMouseEnter={()=>{setOpen2(true)}} onMouseLeave={()=>{setOpen2(false)}}
            >
              <div style={{display:'flex',justifyContent:'center',width:'100%',height:'100%'}}><img id={`cardimg_${id}2`} src={src.small} width="100%" height='100%' alt="img" className="cardimg" /></div>
              <Backdrop
                sx={{ color: '#fff', backgroundColor:'rgba(0, 0, 0, 0.799)' ,zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open2}
              >
                <div className="nameAndLike2">
                  <div className="userName2">
                    <div className="imgAndbio">
                      <div> <img  src={user.profile_image.large} alt={user.name} className="profileImg" /></div>
                      <div><span style={{color:'white'}}>@{user.username}</span></div>
                      <div style={{fontSize:'1.0rem',color:'white'}}>{user.location}</div>
                      <div>{user.for_hire?<div className="hire" style={{color:'white'}}>Available to be hired</div>:null}</div>
                      <div className="bio">{user.bio}</div>
                    </div>
                    <div className="profleAndLikes" style={{display:'flex',justifyContent:'space-between'}}>
                    <div className="profile">
                      <div className="nameModal">{user.name.length>13?(user.first_name):user.name}</div>
                      <div>
                        <button 
                          // clasName="btns" 
                          style={{width:'100px',height:'30px',margin:'5px 0 10px 0',color:'black',borderRadius:'0.4rem',border:'0px solid transparent'}}
                          >
                            <a target="blank" href={user.links.html} style={{textDecoration:'none',color:'black'}} >Profile</a>
                        </button>
                      </div>
                      <div 
                      // clasName="btns" 
                        style={{width:'100px',height:'30px',margin:'0px 0 10px 0',color:'black',borderRadius:'1.1rem',border:'0px solid transparent'}} 
                      >  
                          {user.portfolio_url?<button style={{width:'100px',height:'30px',margin:'0px 0 10px 0',color:'black',borderRadius:'0.4rem',border:'0px solid transparent'}}><a target="blank" href={user.portfolio_url} style={{textDecoration:'none',color:'black'}} >Portfolio Url</a><br/></button>:null}
                      </div>
                    </div>
                    
                      <div className="right">
                        <div style={{color:'white'}}>Connect and Like</div>
                        <div className="socialHandles">
                          <div className="socialmedia">
                            <a target="blank" href={`https://www.instagram.com/${user.social.instagram_username}`}><InstagramIcon fontSize="large" sx={{ color:'pink' }}/></a>
                          </div>
                          <div className="socialmedia">
                            <a target="blank" href={`https://www.twitter.com/${user.social.twitter_username}`} ><TwitterIcon fontSize="large" color="primary"/></a>
                          </div>
                        </div>
                        <div className="likesAndPhotos">
                          <FavoriteIcon sx={{ color:'gray' }} fontSize="medium"/> <div style={{marginRight:10,color:'white'}}> &nbsp;{user.total_likes}</div> | &nbsp;&nbsp;
                          <InsertPhotoIcon /><div style={{color:'white'}}>&nbsp;{user.total_photos}</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </Backdrop>
            </Box>
        </div>
      </Modal>
     
        <img id={`cardimg_${id}`} style={{borderTopLeftRadius:'0.4rem',borderTopRightRadius:'0.4rem'}} src={src.thumb} alt={alt} onClick={()=>{setOpen(true)}} />
        <div className="nameAndLike">
          <div className="userName">
            <div className="imgProfile">
              <img  src={user.profile_image.small} alt={user.name} style={{borderRadius:'50%',margin:'5px auto'}} />
            </div>
            <div className="names">
              <span>{user.name.length>14?(user.first_name):user.name}</span><br/>
              <span style={{color:'rgb(190, 190, 190)'}}>@{user.username.length>13?(user.username.substring(0,13)+'..'):user.username}</span>
            </div>
          </div>
          <div className="likes">
            <div>
              <ThumbUpAltOutlinedIcon fontSize="small"/>
            </div>
            <div style={{fontSize:'0.7rem'}}>
              {likes}
            </div>
          </div>
        </div>
      </div>
  )
}


export default Cards;