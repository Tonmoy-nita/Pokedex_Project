function useDebounce(cb, delay = 2000){
    let timerId;
    return (...args)=>{
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
        cb(...args);
        },delay)
    }
}

export default useDebounce;

// import { useRef } from "react";

// function useDebounce(cb, delay = 2000) {
//   const timerId = useRef(null);

//   return (...args) => {
//     if (timerId.current) {
//       clearTimeout(timerId.current);
//     }
//     timerId.current = setTimeout(() => {
//       cb(...args);
//     }, delay);
//   };
// }

// export default useDebounce;
