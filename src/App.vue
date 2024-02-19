<template>
    <h1>{{ $t('post.list.title') }}</h1>

    <div
    class="table__wrap"
    v-loader="{ loader: postListLoader }"
    >
        <ListSearch
        :search="searchPostByTitle"
        @update-search="updateSearchPostByTitle"
        />

        <template v-if="postListLoader && postListLoader.hasOwnProperty('isLoading') && !postListLoader.isLoading">
            <template v-if="renderedPostList.length > 0">
                <table>
                    <ListHeader
                    :columns="postListColumns"
                    />

                    <tbody>
                        <PostItem
                        v-if="postList.length > 0"
                        v-for="(item, itemIndex) in renderedPostList"
                        :item="item"
                        :itemIndex="itemIndex + (postListCurrentPage * postPerPage - postPerPage)"
                        :columns="postListColumns"
                        @deletePost="modalShow('modalDelete', $event)"
                        />
                    </tbody>
                </table>

                <ListFooter
                v-if="!searchPostByTitle"
                :totalPages="totalPages"
                :currentPage="postListCurrentPage"
                :postPerPage="postPerPage"
                @changePage="changePage"
                @changePostPerPage="changePostPerPage"
                />
            </template>

            <div v-else>
                <h5>{{ $t('post.list.empty') }}</h5>
            </div>
        </template>
    </div>

    <Modal
    ref="modalDelete"
    :title="$t('post.modals.delete.title')"
    :text="$t('post.modals.delete.text')"
    :actionText="$t('post.modals.delete.action_text')"
    @action="modalActionDeletePost"
    />
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import ListSearch from "~/components/Core/ListSearch.vue"
import ListHeader from "~/components/Core/ListHeader.vue"
import ListFooter from "~/components/Core/ListFooter.vue"
import PostItem from "~/components/Post/PostItem.vue"
import Modal from "~/components/Core/Modal.vue"

export default {
    components: {
        ListSearch, ListHeader, ListFooter, PostItem, Modal
    },
    data() {
        return {
            postPerPage: 10,
            searchPostByTitle: null,
        }
    },
    computed: {
        ...mapState('post', [
            'postList', 'postListLoader', 'postListColumns', 'postListCurrentPage'
        ]),
        renderedPostList() {
            if (this.searchPostByTitle) {
                const searchLowerCase = this.searchPostByTitle.toLowerCase()

                return this.postList.filter(item =>
                    item.title.toLowerCase().includes(searchLowerCase)
                )
            } else {
                const startIndex = (this.postListCurrentPage - 1) * this.postPerPage
                const endIndex = startIndex + this.postPerPage

                return this.postList.slice(startIndex, endIndex)
            }
        },
        totalPages() {
            return Math.ceil(this.postList.length / this.postPerPage)
        }
    },
    methods: {
        ...mapMutations('post', [
            'setPostListCurrentPage'
        ]),
        ...mapActions('post', [
            'getPostList', 'deletePost'
        ]),
        init() {
            this.getPostList()
        },
        changePage(page) {
            this.setPostListCurrentPage(page)
        },
        changePostPerPage(payload) {
            this.postPerPage = payload
        },
        updateSearchPostByTitle(query) {
            this.searchPostByTitle = query
        },
        modalShow(ref, payload) {
            this.$refs[ref].openModal(payload)
        },
        modalHide(ref) {
            this.$refs[ref].closeModal()
        },
        modalActionDeletePost(payload) {
            this.deletePost(payload)
                .finally(() => {
                    this.modalHide('modalDelete')
                })
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
    font-size: 14px;
}

.table__wrap {
    min-height: 332px;
}
</style>
