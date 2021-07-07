<template>
    <div class="ghost-collection-edit">
        <wwEditorFormRow label="Ressource" required>
            <wwEditorSelect
                :options="ressourcesOptions"
                :model-value="endpoint.ressource"
                placeholder="Select a ressource"
                large
                @update:modelValue="setProp('ressource', $event)"
            />
        </wwEditorFormRow>
        <div class="ghost-collection-edit__row">
            <wwEditorFormRow label="Method" required class="-full">
                <wwEditorSelect
                    :options="methodsOptions"
                    :model-value="endpoint.method"
                    placeholder="Select a method"
                    large
                    @change="setProp('method', $event)"
                />
            </wwEditorFormRow>
            <wwEditorFormRow v-if="endpoint.method !== 'browse'" :label="endpoint.method" required class="-full">
                <wwEditorFormInput
                    type="text"
                    name="param"
                    :model-value="endpoint.param"
                    :placeholder="endpoint.method"
                    large
                    @update:modelValue="setProp('param', $event)"
                />
            </wwEditorFormRow>
        </div>
        <wwEditorFormRow v-if="endpoint.ressource && endpoint.ressource !== 'settings'" label="Include">
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
                    v-else-if="endpoint.ressource === 'authors' || endpoint.ressource === 'tags'"
                    class="ghost-collection-edit__row m-bottom"
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
                :model-value="endpoint.fields"
                large
                @update:modelValue="setProp('fields', $event)"
            />
        </wwEditorFormRow>
        <template v-if="endpoint.method === 'browse' && endpoint.ressource !== 'settings'">
            <wwEditorFormRow label="Filter" class="-full">
                <template #append-label>
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
                    :model-value="endpoint.filterByFormula"
                    large
                    @update:modelValue="setProp('filterByFormula', $event)"
                />
            </wwEditorFormRow>
            <div class="ghost-collection-edit__row">
                <wwEditorFormRow label="Limit" class="-full">
                    <template #append-label>
                        <a
                            class="ghost-collection-edit__link"
                            href="//ghost.org/docs/content-api/#limit"
                            target="_blank"
                        >
                            Find it here
                        </a>
                    </template>
                    <wwEditorFormInput
                        type="number"
                        name="limit"
                        placeholder="default: 15"
                        :model-value="endpoint.limit"
                        large
                        @update:modelValue="setProp('limit', $event)"
                    />
                </wwEditorFormRow>
                <wwEditorFormRow label="Page" class="-full">
                    <template #append-label>
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
                        :model-value="endpoint.page"
                        large
                        @update:modelValue="setProp('page', $event)"
                    />
                </wwEditorFormRow>
            </div>
            <wwEditorFormRow label="Order">
                <template #append-label>
                    <button
                        type="button"
                        class="ww-editor-button -primary -small m-auto-left m-bottom"
                        @click="addOrder"
                    >
                        Add a field to order by
                    </button>
                </template>
                <div
                    v-for="(order, index) in endpoint.order"
                    :key="index"
                    class="ghost-collection-edit__row -space-between m-bottom"
                >
                    <div v-if="!index" class="label-xs">Order by</div>
                    <div v-else class="label-xs">then by</div>
                    <wwEditorFormInput
                        type="text"
                        :model-value="order.field"
                        placeholder="Field"
                        @update:modelValue="setOrderProp(index, { field: $event })"
                    />
                    <wwEditorSelect
                        :options="directionOptions"
                        :model-value="order.direction"
                        @update:modelValue="setOrderProp(index, { direction: $event })"
                    />
                    <button
                        type="button"
                        class="ww-editor-button -tertiary -small -icon -red"
                        @click="deleteOrder(index)"
                    >
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
        config: { type: Object, required: true },
    },
    emits: ['update:config'],
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
    computed: {
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
            this.$emit('update:config', { ...this.endpoint, [key]: value });
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
