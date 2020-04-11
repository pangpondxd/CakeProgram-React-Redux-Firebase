import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://jobsphuket-dfdd9.firebaseio.com/'
})

export default instance