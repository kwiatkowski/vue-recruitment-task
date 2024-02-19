<template>
    <thead v-if="columns.length > 0">
        <tr>
            <th
            :class="'col--th-' + column"
            v-for="(column, columnIndex) in columns"
            v-html="$t('post.list.columns.' + column)"
            ></th>
        </tr>
    </thead>
</template>

<script>
export default {
    props: {
        columns: {
            type: Array,
            default: null
        }
    }
}
</script>
