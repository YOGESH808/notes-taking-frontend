import { useCallback, useRef } from "react"

const useDebounce = (fn,delay)=>{
    const timeOutRef = useRef(null);
    return useCallback((...args)=>{
        clearTimeout(timeOutRef.current);
        timeOutRef.current=setTimeout(()=>{
            fn(...args);
        }, delay);
    },[fn,delay]);
}
export default useDebounce;