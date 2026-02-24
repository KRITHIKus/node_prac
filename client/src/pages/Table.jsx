import { useState,useEffect } from "react";
import axios from "axios";


export default function Table(){
const [data,setdata]=useState([])
const pageNumber=0

useEffect(()=>{
    const info = async()=>{
        let data=await axios.get()
    }
})

}