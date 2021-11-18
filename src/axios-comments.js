import axios from "axios";

const instance = axios.create({
baseURL: 'https://expresate-react-default-rtdb.firebaseio.com/'
});

export default instance;