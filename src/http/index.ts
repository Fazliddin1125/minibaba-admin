import axios from "axios"

export const SERVER_URL = import.meta.env.VITE_SERVER_URL
export const API_URL = "https://cdi.geeks-soft.uz"

const $axios = axios.create({
  baseURL: SERVER_URL,
})

export default $axios
