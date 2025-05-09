import  React, { useEffect } from 'react'

const useOutSideClick = (ref:React.RefObject<HTMLElement|null>,callback:()=>void) => {
  useEffect(()=>{
    const handleClick=(e:MouseEvent)=>{
      if(ref.current && !ref.current.contains(e.target as Node)){
        callback();
      }
    };
    document.addEventListener("mousedown",handleClick);
    return()=>{
      document.removeEventListener("mousedown",handleClick)
    }
  },[ref,callback]);
  
}

export default useOutSideClick