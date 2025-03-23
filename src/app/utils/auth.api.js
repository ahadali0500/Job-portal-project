
import axios from 'axios'
import { API_URL } from './config';


export async function register(data) {
    try {
        const response = await axios.post(`${API_URL}/register.php`, data);
        return response.data;
        
    } catch (error) {
        return error;
    }
}