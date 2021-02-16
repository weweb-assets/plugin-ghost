<template>
    <div class="ww-popup-ghost-endpoint">
        <label class="ghost-endpoint__label caption-s" for="ressource-ghost">
            Ressource
            <div class="ghost-endpoint__label-required">required</div>
        </label>
        <wwEditorSelect
            class="ghost-endpoint__input -large"
            :options="ressourcesOptions"
            v-model="endpoint.ressource"
            placeholder="Select a ressource"
        />
        <div class="ghost-endpoint__row -space-between">
            <div class="ghost-endpoint__row-item">
                <label class="ghost-endpoint__label caption-s" for="method-ghost">
                    Method
                    <div class="ghost-endpoint__label-required">required</div>
                </label>
                <wwEditorSelect
                    class="ghost-endpoint__input -large"
                    :options="methodsOptions"
                    v-model="endpoint.method"
                    placeholder="Select a method"
                    :disabled="!isSetup"
                />
            </div>
            <template v-if="endpoint.method !== 'browse'">
                <div class="ghost-endpoint__row-item">
                    <label class="ghost-endpoint__label caption-s" for="param-ghost">
                        {{ endpoint.method }}
                        <div class="ghost-endpoint__label-required">required</div>
                    </label>
                    <input
                        type="text"
                        name="param-ghost"
                        class="ghost-endpoint__input caption-m ww-editor-input -large"
                        :placeholder="endpoint.method"
                        v-model="endpoint.param"
                        :disabled="!isSetup"
                    />
                </div>
            </template>
        </div>
        <label class="ghost-endpoint__label caption-s" for="name-ghost">
            Name
            <div class="ghost-endpoint__label-required">optional</div>
        </label>
        <input
            type="text"
            name="name-ghost"
            class="ghost-endpoint__input caption-m ww-editor-input -large"
            placeholder="Published posts"
            v-model="endpoint.name"
            :disabled="!isSetup"
        />
        <label class="ghost-endpoint__label caption-s" for="display-by-ghost">
            Display by
            <div class="ghost-endpoint__label-required">optional</div>
        </label>
        <input
            type="text"
            name="display-by-ghost"
            class="ghost-endpoint__input caption-m ww-editor-input -large"
            placeholder="title"
            v-model="endpoint.displayBy"
            :disabled="!isSetup"
        />
        <template v-if="isSetup && endpoint.ressource !== 'settings'">
            <label class="ghost-endpoint__label caption-s" for="display-by-ghost">
                Include
                <div class="ghost-endpoint__label-required">optional</div>
            </label>
            <template v-if="endpoint.ressource === 'posts' || endpoint.ressource === 'pages'">
                <div class="ghost-endpoint__row ghost-endpoint__input">
                    <wwManagerRadio v-model="endpoint.include.authors" :disabled="!isSetup" />
                    <div class="caption-m m-left">Authors</div>
                </div>
                <div class="ghost-endpoint__row ghost-endpoint__input">
                    <wwManagerRadio v-model="endpoint.include.tags" :disabled="!isSetup" />
                    <div class="caption-m m-left">Tags</div>
                </div>
            </template>
            <div
                class="ghost-endpoint__row ghost-endpoint__input"
                v-else-if="endpoint.ressource === 'authors' || endpoint.ressource === 'tags'"
            >
                <wwManagerRadio v-model="endpoint.include.posts" :disabled="!isSetup" />
                <div class="caption-m m-left">Count posts</div>
            </div>
        </template>
        <label class="ghost-endpoint__label caption-s" for="display-by-ghost">
            Fields
            <div class="ghost-endpoint__label-required">optional</div>
        </label>
        <input
            type="text"
            name="filter-ghost"
            class="ghost-endpoint__input caption-m ww-editor-input -large"
            placeholder="title, slug, url"
            v-model="endpoint.fields"
            :disabled="!isSetup"
        />
        <template v-if="isSetup && endpoint.method === 'browse' && endpoint.ressource !== 'settings'">
            <label class="ghost-endpoint__label caption-s" for="filter-ghost">
                Filter
                <a class="ghost-endpoint__link" href="//ghost.org/docs/content-api/#syntax-reference" target="_blank">
                    Find it here
                </a>
                <div class="ghost-endpoint__label-required">optional</div>
            </label>
            <input
                type="text"
                name="filter-ghost"
                class="ghost-endpoint__input caption-m ww-editor-input -large"
                placeholder="featured:true"
                v-model="endpoint.filterByFormula"
                :disabled="!isSetup"
            />
            <div class="ghost-endpoint__row -space-between">
                <div class="ghost-endpoint__row-item">
                    <label class="ghost-endpoint__label caption-s" for="limit-ghost">
                        Limit
                        <a class="ghost-endpoint__link" href="//ghost.org/docs/content-api/#limit" target="_blank">
                            Find it here
                        </a>
                        <div class="ghost-endpoint__label-required">optional</div>
                    </label>
                    <input
                        type="text"
                        name="limit-ghost"
                        class="ghost-endpoint__input caption-m ww-editor-input -large"
                        placeholder="default: 15"
                        v-model="endpoint.limit"
                        :disabled="!isSetup"
                    />
                </div>
                <div class="ghost-endpoint__row-item">
                    <label class="ghost-endpoint__label caption-s" for="page-ghost">
                        Page
                        <a class="ghost-endpoint__link" href="//ghost.org/docs/content-api/#page" target="_blank">
                            Find it here
                        </a>
                        <div class="ghost-endpoint__label-required">optional</div>
                    </label>
                    <input
                        type="number"
                        name="page-ghost"
                        class="ghost-endpoint__input caption-m ww-editor-input -large"
                        placeholder="default: first 15 record"
                        v-model="endpoint.page"
                        :disabled="!isSetup"
                    />
                </div>
            </div>
            <div class="ghost-endpoint__row ghost-endpoint__input">
                <label class="ghost-endpoint__label caption-s" for="endpoint-view"> Order </label>
                <button class="ww-editor-button -primary -small m-auto-left" @click="addOrder" :disabled="!isSetup">
                    Add a field to order by
                </button>
            </div>
            <div
                class="ghost-endpoint__row -space-between ghost-endpoint__input"
                v-for="(order, index) in endpoint.order"
                :key="index"
            >
                <div class="caption-s" v-if="!index">Order by</div>
                <div class="caption-s" v-else>then by</div>
                <input
                    type="text"
                    class="caption-m ww-editor-input"
                    v-model="order.field"
                    :disabled="!isSetup"
                    placeholder="Field"
                />
                <wwEditorSelect
                    class="ghost-endpoint__select"
                    :options="directionOptions"
                    :value="order.direction"
                    @input="updateOrder(order, $event)"
                />
                <div class="ghost-endpoint__button-delete" @click="deleteOrder(index)">
                    <wwEditorIcon name="delete" small />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'EndpointPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            ressourcesOptions: [
                { value: 'posts', label: 'Posts' },
                { value: 'authors', label: 'Authors' },
                { value: 'tags', label: 'Tags' },
                { value: 'pages', label: 'Pages' },
                { value: 'settings', label: 'Settings' },
            ],
            directionOptions: [
                { value: 'asc', label: 'Asc', default: true },
                { value: 'desc', label: 'Desc' },
            ],
            endpoint: {
                id: wwLib.wwUtils.getUid(),
                ressource: undefined,
                method: 'browse',
                param: undefined,
                name: undefined,
                displayBy: undefined,
                include: {
                    authors: false,
                    tags: false,
                    posts: false,
                },
                filter: undefined,
                limit: undefined,
                page: undefined,
                order: [],
            },
        };
    },
    watch: {
        isSetup() {
            this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
        },
    },
    computed: {
        methodsOptions() {
            return [
                { value: 'browse', label: 'Browse' },
                ...(this.endpoint.ressource !== 'settings'
                    ? [
                          { value: 'id', label: 'Read by Id' },
                          { value: 'slug', label: 'Read by slug' },
                      ]
                    : []),
            ];
        },
        isSetup() {
            return this.endpoint.ressource && this.endpoint.method;
        },
    },
    methods: {
        addOrder() {
            if (!this.endpoint.order) this.endpoint.order = [];
            this.endpoint.order.push({ field: '', direction: 'asc' });
            this.$forceUpdate();
        },
        updateOrder(order, event) {
            order.direction = event;
            this.$forceUpdate();
        },
        deleteOrder(index) {
            this.endpoint.order.splice(index, 1);
            this.$forceUpdate();
        },
    },
    created() {
        this.endpoint = this.options.data.endpoint || this.endpoint;
        this.options.result.endpoint = this.endpoint;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-ghost-endpoint {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .ghost-endpoint {
        &__label {
            display: flex;
            align-items: center;
            font-weight: 500;
            color: var(--ww-color-dark-500);
            margin-bottom: var(--ww-spacing-01);
            text-transform: capitalize;
            &-required {
                margin-left: auto;
                text-transform: none;
                color: var(--ww-color-dark-400);
            }
        }
        &__link {
            color: var(--ww-color-blue-500);
            margin-left: var(--ww-spacing-02);
        }
        &__input {
            margin-bottom: var(--ww-spacing-03);
        }
        &__row {
            display: flex;
            align-items: center;
            &.-space-between {
                justify-content: space-between;
            }
            &-item {
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-right: var(--ww-spacing-02);
                &:last-child {
                    margin-right: 0;
                    margin-left: var(--ww-spacing-02);
                }
                &:first-child {
                    margin-left: 0;
                }
            }
        }
        &__button-delete {
            margin-right: var(--ww-spacing-03);
            cursor: pointer;
            transition: color 0.3s ease;
            &:hover {
                color: var(--ww-color-red-500);
            }
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-left {
        margin-left: var(--ww-spacing-02);
    }
}
</style>
