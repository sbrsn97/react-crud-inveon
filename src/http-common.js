import axios from "axios"

export default axios.create({
    baseURL : "https://654e4bcbcbc325355742b200.mockapi.io/api/",
    headers : {
        "Content-type" : "application/json"
    }
});