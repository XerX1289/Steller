import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers:{
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjY3NTk4MDNmNmQ3ZmEyYTU4MDZjMzA0ODU4MmFiYiIsIm5iZiI6MTcyMzA2MjQ4MS4zNjQzMTYsInN1YiI6IjY2YjNkNDU3YTk3YWU4MWZhZDJiMTY1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KV2tsOaLZzXZKYNJ5SuAfBuThFcXQLonrgHkceTpZhM' 
    }
});
export default instance;