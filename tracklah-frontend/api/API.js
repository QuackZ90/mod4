import axios from 'axios';
import {API_URL, API_TOKEN} from "@env"

// console.log("Using API_TOKEN:",API_TOKEN) 
// console.log("Running API_URL",API_URL) 

export const API = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization : `${API_TOKEN}`
    },
  });
