<template>
    <div class="ghost-settings-edit">
        <wwEditorFormRow required label="URL">
            <wwEditorFormInput
                type="text"
                name="url"
                placeholder="https://my-ghost.ghost.io"
                :model-value="settings.privateData.url"
                large
                @update:modelValue="setPrivateProp('url', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow required label="Content API key">
            <template v-if="settings.privateData.url" #append-label>
                <a class="ghost-settings-edit__link" :href="integrationUrl" target="_blank">Find it here</a>
            </template>
            <wwEditorFormInput
                type="text"
                name="content-api-key"
                placeholder="Key"
                :model-value="settings.privateData.contentApiKey"
                large
                @update:modelValue="setPrivateProp('contentApiKey', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow required label="Admin API key">
            <template v-if="settings.privateData.url" #append-label>
                <a class="ghost-settings-edit__link" :href="integrationUrl" target="_blank">Find it here</a>
            </template>
            <wwEditorFormInput
                type="text"
                name="admin-api-key"
                placeholder="Key"
                :model-value="settings.privateData.adminApiKey"
                large
                @update:modelValue="setPrivateProp('adminApiKey', $event)"
            />
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    computed: {
        integrationUrl() {
            let url = this.settings.privateData.url || '';
            if (url.endsWith('/')) url = url.slice(0, -1);
            return `${url}/ghost/#/settings/integrations`;
        },
    },
    methods: {
        setPrivateProp(key, value) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, [key]: value },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.ghost-settings-edit {
    &__link {
        color: var(--ww-color-blue-500);
        margin-left: var(--ww-spacing-02);
    }
}
</style>
