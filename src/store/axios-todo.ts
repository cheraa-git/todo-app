import axios from 'axios'

export default axios.create({
  baseURL: 'https://todos-5bbd0-default-rtdb.firebaseio.com',
})
