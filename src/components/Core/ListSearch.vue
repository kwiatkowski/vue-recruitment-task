<template>
    <div class="list__search">
        <input
        type="text"
        :placeholder="$t('post.list.search')"
        :value="search"
        @input="$emit('updateSearch', $event.target.value)"
        />
    </div>
</template>

<script>
export default {
    props: {
        search: {
            type: String,
            default: null
        }
    }
}
</script>

<style lang="scss">
.list__search {
    margin: 10px 0;
    text-align: right;
}
</style>