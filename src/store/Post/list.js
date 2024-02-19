import PostAPI from '~/api/api-post'

import Loader from '~/store/Core/loader'

export default {
    namespaced: true,
    state: {
        postListLoader: {...Loader.states},
        postList: [],
        postListColumns: [
            'id', 'title', 'body', 'actions'
        ],
        postListCurrentPage: 1
    },
    mutations: {
        ...Loader.mutations,
        setPostList(state, payload) {
            state.postList = payload
        },
        deletePost(state, payload) {
            const indexToDelete = state.postList.findIndex(post => post.id === payload)
        
            if (indexToDelete !== -1) {
                state.postList.splice(indexToDelete, 1)
            }
        },
        setPostListCurrentPage(state, payload) {
            state.postListCurrentPage = payload
        },
    },
    actions: {
        getPostList({ commit }) {
            commit('loadStart', { name: 'postListLoader' })

            return PostAPI.getPostList()
                .then((response) => {
                    commit('loadSuccess', { name: 'postListLoader' })
                    commit('setPostList', response.data)
                })
                .catch((error) => {
                    commit('loadError', { name: 'postListLoader' })
                    console.error(error)
                })
        },
        deletePost({ commit }, id) {
            commit('loadStart', { name: 'postListLoader' })

            return PostAPI.deletePost(id)
                .then((response) => {
                    commit('loadSuccess', { name: 'postListLoader' })
                    commit('deletePost', id)
                })
                .catch((error) => {
                    commit('loadError', { name: 'postListLoader' })
                    console.error(error)
                })
            
        }
    }
}
