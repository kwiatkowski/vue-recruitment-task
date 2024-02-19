<template>
    <div
    class="modal__overlay"
    v-if="isShow"
    >
        <div class="modal">
            <div
            class="modal__header"
            v-html="title"
            ></div>

            <div
            class="modal__content"
            v-html="text + ' <strong>' + data.title + '</strong>?'"
            ></div>

            <div class="modal__footer">
                <button
                @click="closeModal"
                v-html="$t('post.modals.cancel')"
                ></button>

                <button
                @click="handleAction(data.id)"
                v-html="actionText"
                ></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: null
        },
        text: {
            type: String,
            default: null
        },
        actionText: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            isShow: false,
            data: {}
        }
    },
    methods: {
        openModal(payload) {
            this.data = payload
            this.isShow = true
        },
        closeModal() {
            this.isShow = false
        },
        handleAction(payload) {
            this.$emit('action', payload)
        }
    }
}
</script>
