import axios, {AxiosInstance} from 'axios'

export const AxiosClient = (): AxiosInstance => {
  return axios.create({
    baseURL: 'http://localhost:8080/',  
    headers: {
        'Content-Type':  'application/json'
    } 
  })
}
