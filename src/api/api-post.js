import axios from 'axios'

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
})

export default {
    getPostList: () => api.get(`/posts`),
    deletePost(id) {
        return api.delete(`/posts/${id}`)
    }
}
