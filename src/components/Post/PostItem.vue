<template>
    <tr v-if="columns.length > 0">
        <td
        :class="'col--td-' + column"
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        >
            <template v-if="columnIndex === 0">
                {{ itemIndex + 1 }}
            </template>

            <template v-else-if="columnIndex === columns.length - 1">
                <button
                @click="deletePost()"
                v-html="$t('post.list.actions.delete')"
                ></button>
            </template>

            <template v-else>
                {{ item[column] }}
            </template>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: null
        },
        itemIndex: {
            type: Number,
            default: null
        },
        columns: {
            type: Array,
            default: null
        }
    },
    methods: {
        deletePost() {
            this.$emit('delete-post', this.item)
        }
    }
}
</script>

<style lang="scss">
.col--td-actions {
    text-align: right;
}
</style>
