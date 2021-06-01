<template>
    <div class="ghost-settings-edit">
        <wwEditorFormRow required label="URL">
            <wwEditorFormInput
                type="text"
                name="url"
                placeholder="https://my-ghost.ghost.io"
                :value="settings.privateData.url"
                @input="updatePrivateData('url', $event)"
                v-on:keyup.native.enter="$emit('save')"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow required label="Content API key">
            <template slot="append-label" v-if="settings.privateData.url">
                <a class="ghost-settings-edit__link" :href="integrationUrl" target="_blank">Find it here</a>
            </template>
            <wwEditorFormInput
                type="text"
                name="content-api-key"
                placeholder="Key"
                :value="settings.privateData.contentApiKey"
                @input="updatePrivateData('contentApiKey', $event)"
                v-on:keyup.native.enter="$emit('save')"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow required label="Admin API key">
            <template slot="append-label" v-if="settings.privateData.url">
                <a class="ghost-settings-edit__link" :href="integrationUrl" target="_blank">Find it here</a>
            </template>
            <wwEditorFormInput
                type="text"
                name="admin-api-key"
                placeholder="Key"
                :value="settings.privateData.adminApiKey"
                @input="updatePrivateData('adminApiKey', $event)"
                v-on:keyup.native.enter="$emit('save')"
                large
            />
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    watch: {
        isValid: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    computed: {
        isValid() {
            const { contentApiKey, adminApiKey, url } = this.settings.privateData;
            return !!contentApiKey && !!adminApiKey && !!url;
        },
        integrationUrl() {
            let url = this.settings.privateData.url || '';
            if (url.endsWith('/')) url = url.slice(0, -1);
            return `${url}/ghost/#/settings/integrations`;
        },
    },
    methods: {
        updatePrivateData(key, value) {
            this.$emit('update-settings', {
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
