<template>
    <div class="ghost-collection-edit">
        <wwEditorFormRow label="Ressource" required>
            <wwEditorSelect
                :options="ressourcesOptions"
                :value="endpoint.ressource"
                @input="setProp('ressource', $event)"
                placeholder="Select a ressource"
                large
            />
        </wwEditorFormRow>
        <div class="ghost-collection-edit__row">
            <wwEditorFormRow label="Method" required class="-full">
                <wwEditorSelect
                    :options="methodsOptions"
                    :value="endpoint.method"
                    @change="setProp('method', $event)"
                    placeholder="Select a method"
                    large
                />
            </wwEditorFormRow>
            <wwEditorFormRow :label="endpoint.method" required v-if="endpoint.method !== 'browse'" class="-full">
                <wwEditorFormInput
                    type="text"
                    name="param"
                    :value="endpoint.param"
                    @input="setProp('param', $event)"
                    :placeholder="endpoint.method"
                    v-on:keyup.native.enter="$emit('next')"
                    large
                />
            </wwEditorFormRow>
        </div>
        <wwEditorFormRow label="Include" v-if="isSetup && endpoint.ressource !== 'settings'">
            <div class="ghost-collection-edit__row">
                <template v-if="endpoint.ressource === 'posts' || endpoint.ressource === 'pages'">
                    <div class="ghost-collection-edit__row m-bottom">
                        <wwManagerRadio v-model="endpoint.include.authors" />
                        <div class="caption-m">Authors</div>
                    </div>
                    <div class="ghost-collection-edit__row m-bottom">
                        <wwManagerRadio v-model="endpoint.include.tags" />
                        <div class="caption-m">Tags</div>
                    </div>
                </template>
                <div
                    class="ghost-collection-edit__row m-bottom"
                    v-else-if="endpoint.ressource === 'authors' || endpoint.ressource === 'tags'"
                >
                    <wwManagerRadio v-model="endpoint.include.posts" />
                    <div class="caption-m">Count posts</div>
                </div>
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow label="Fields">
            <wwEditorFormInput
                type="text"
                name="fields"
                placeholder="title, slug, url"
                :value="endpoint.fields"
                @input="setProp('fields', $event)"
                v-on:keyup.native.enter="$emit('next')"
                large
            />
        </wwEditorFormRow>
        <template v-if="endpoint.method === 'browse' && endpoint.ressource !== 'settings'">
            <wwEditorFormRow label="Filter" class="-full">
                <template slot="append-label">
                    <a
                        class="ghost-collection-edit__link"
                        href="//ghost.org/docs/content-api/#syntax-reference"
                        target="_blank"
                    >
                        Find it here
                    </a>
                </template>
                <wwEditorFormInput
                    type="text"
                    name="filter"
                    placeholder="featured:true"
                    :value="endpoint.filterByFormula"
                    @input="setProp('filterByFormula', $event)"
                    v-on:keyup.native.enter="$emit('next')"
                    large
                />
            </wwEditorFormRow>
            <div class="ghost-collection-edit__row">
                <wwEditorFormRow label="Limit" class="-full">
                    <template slot="append-label">
                        <a
                            class="ghost-collection-edit__link"
                            href="//ghost.org/docs/content-api/#limit"
                            target="_blank"
                        >
                            Find it here
                        </a>
                    </template>
                    <wwEditorFormInput
                        type="text"
                        name="limit"
                        placeholder="default: 15"
                        :value="endpoint.limit"
                        @input="setProp('limit', $event)"
                        v-on:keyup.native.enter="$emit('next')"
                        large
                    />
                </wwEditorFormRow>
                <wwEditorFormRow label="Page" class="-full">
                    <template slot="append-label">
                        <a
                            class="ghost-collection-edit__link"
                            href="//ghost.org/docs/content-api/#page"
                            target="_blank"
                        >
                            Find it here
                        </a>
                    </template>
                    <wwEditorFormInput
                        type="number"
                        name="page"
                        placeholder="default: first 15 record"
                        :value="endpoint.page"
                        @input="setProp('page', $event)"
                        v-on:keyup.native.enter="$emit('next')"
                        large
                    />
                </wwEditorFormRow>
            </div>
            <wwEditorFormRow label="Order">
                <template slot="append-label">
                    <button
                        class="ww-editor-button -primary -small m-auto-left m-bottom"
                        @click="addOrder"
                        :disabled="!isSetup"
                    >
                        Add a field to order by
                    </button>
                </template>
                <div
                    class="ghost-collection-edit__row -space-between m-bottom"
                    v-for="(order, index) in endpoint.order"
                    :key="index"
                >
                    <div class="label-xs" v-if="!index">Order by</div>
                    <div class="label-xs" v-else>then by</div>
                    <wwEditorFormInput
                        type="text"
                        :value="order.field"
                        @input="setOrderProp(index, { field: $event })"
                        placeholder="Field"
                        v-on:keyup.native.enter="$emit('next')"
                    />
                    <wwEditorSelect
                        :options="directionOptions"
                        :value="order.direction"
                        @input="setOrderProp(index, { direction: $event })"
                    />
                    <button class="ww-editor-button -tertiary -small -icon -red" @click="deleteOrder(index)">
                        <wwEditorIcon class="ww-editor-button-icon" name="delete" small />
                    </button>
                </div>
            </wwEditorFormRow>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        config: { type: Object, required: true },
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
        };
    },
    watch: {
        isSetup: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    computed: {
        isSetup() {
            return !!this.endpoint.ressource && !!this.endpoint.method;
        },
        endpoint() {
            return {
                ressource: undefined,
                method: 'browse',
                param: undefined,
                include: {
                    authors: false,
                    tags: false,
                    'count.posts': false,
                },
                filter: undefined,
                limit: undefined,
                page: undefined,
                order: [],
                ...this.config,
            };
        },
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
    },
    methods: {
        addOrder() {
            const orders = _.cloneDeep(this.endpoint.order || []);
            orders.push({ field: '', direction: 'asc' });
            this.setProp('order', orders);
        },
        setOrderProp(index, value) {
            const orders = _.cloneDeep(this.endpoint.order);
            orders.splice(index, 1, { ...orders[index], ...value });
            this.setProp('order', orders);
        },
        deleteOrder(index) {
            const orders = _.cloneDeep(this.endpoint.order);
            orders.splice(index, 1);
            this.setProp('order', orders);
        },
        setProp(key, value) {
            this.$emit('update-config', { ...this.endpoint, [key]: value });
        },
    },
};
</script>

<style scoped lang="scss">
.ghost-collection-edit {
    display: flex;
    flex-direction: column;
    &__link {
        color: var(--ww-color-blue-500);
        margin-left: var(--ww-spacing-02);
    }
    &__row {
        display: flex;
        align-items: center;
        > *:not(:first-child) {
            margin-left: var(--ww-spacing-02);
        }
        &.-space-between {
            justify-content: space-between;
        }
        .-full {
            width: 100%;
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-bottom {
        margin-bottom: var(--ww-spacing-02);
    }
}
</style>
