<template>
    <div class="list__footer">
        <ul
        class="pager"
        v-if="totalPages > 1"
        >
            <li
            class="pager__item"
            v-for="(page, pageIndex) in totalPages"
            :key="pageIndex"
            >
                <a
                class="pager__link"
                :class="{'is-active': page === currentPage}"
                v-html="page"
                @click="changePage(page)"
                ></a>
            </li>
        </ul>

        <div class="pager__post-per-page">
            <select
            :value="postPerPage"
            @change="changePostPerPage"
            >
                <option
                v-for="(option, optionIndex) in listRowOptions"
                :key="optionIndex"
                :value="option"
                v-html="option"
                ></option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    emits: [
        'change-page', 'change-post-per-page'
    ],
    props: {
        totalPages: {
            type: Number,
            default: null
        },
        currentPage: {
            type: Number,
            default: null
        },
        postPerPage: {
            type: Number,
            default: null
        }
    },
    computed: {
        ...mapState([
            'listRowOptions'
        ])
    },
    methods: {
        changePage(page) {
            this.$emit('change-page', page)
        },
        changePostPerPage(event) {
            this.$emit('change-post-per-page', parseInt(event.target.value, 10))
        }
    }
}
</script>

<style lang="scss">
.list__footer {
    margin: 30px 0;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
}

.pager__post-per-page {
    text-align: right;
    padding: 0 15px;

    select {
        height: 28px;
    }
}

.pager {
    list-style: none;
    display: flex;
    padding: 0;
    justify-content: center;

    &__item {
        margin: 0 5px;
        display: inline-block;
    }

    &__link {
        display: block;
        cursor: pointer;
        text-decoration: none;
        padding: 5px 10px;
        border: 1px solid #ccc;
        color: #333;
        border-radius: 3px;

        &.is-active {
            background-color: color(primary);
            color: #fff;
            border: 1px solid color(primary);
        }
    }
}
</style>
