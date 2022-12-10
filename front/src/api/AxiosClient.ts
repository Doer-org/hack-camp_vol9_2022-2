import axios, {AxiosInstance} from 'axios'

export const AxiosClient = (): AxiosInstance => {
  return axios.create({
    baseURL: 'http://localhost:5000/',  
    headers: {
        'Content-Type':  'application/json'
    } 
  })
}