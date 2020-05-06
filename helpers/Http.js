import { API_URL } from 'react-native-dotenv'
import axios from 'axios';

const config = { baseURL: API_URL, timeout: 1000 }
const http = axios.create(config);    

export default http;