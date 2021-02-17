<template>
    <div class="ww-popup-ghost-configuration">
        <label class="ghost-configuration__label caption-s" for="url">
            URL
            <div class="ghost-configuration__label-required">required</div>
        </label>
        <input
            type="text"
            name="url"
            class="ghost-configuration__input caption-m ww-editor-input -large"
            placeholder="https://my-ghost.ghost.io"
            v-model="settings.privateData.url"
        />
        <label class="ghost-configuration__label caption-s" for="content-api-key">
            Content API key
            <a
                v-if="settings.privateData.url"
                class="ghost-endpoint__link"
                :href="`${settings.privateData.url}/ghost/#/settings/integrations`"
                target="_blank"
            >
                Find it here
            </a>
            <div class="ghost-configuration__label-required">required</div>
        </label>
        <input
            type="text"
            name="content-api-key"
            class="ghost-configuration__input caption-m ww-editor-input -large"
            placeholder="Key"
            v-model="settings.privateData.contentApiKey"
        />
        <label class="ghost-configuration__label caption-s" for="admin-api-key">
            Admin API key
            <a
                v-if="settings.privateData.url"
                class="ghost-endpoint__link"
                :href="`${settings.privateData.url}/ghost/#/settings/integrations`"
                target="_blank"
            >
                Find it here
            </a>
            <div class="ghost-configuration__label-required">required</div>
        </label>
        <input
            type="text"
            name="admin-api-key"
            class="ghost-configuration__input caption-m ww-editor-input -large"
            placeholder="Key"
            v-model="settings.privateData.adminApiKey"
        />
    </div>
</template>

<script>
export default {
    name: 'ConfigurationPopup',
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
            settings: {
                privateData: {
                    contentApiKey: '',
                    adminApiKey: '',
                    url: '',
                    endpoints: [],
                },
            },
        };
    },
    watch: {
        isSetup() {
            this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
        },
    },
    computed: {
        isSetup() {
            const { contentApiKey, adminApiKey, url } = this.settings.privateData;
            return contentApiKey.length && adminApiKey.length && url.length;
        },
    },
    methods: {
        async beforeNext() {
            this.options.setLoadingStatus(true);
            try {
                const plugin = wwLib.wwPlugins.pluginGhost;
                plugin.settings = await wwLib.wwPlugin.saveSettings(
                    plugin.id,
                    plugin.settings.id,
                    this.settings.data,
                    this.settings.privateData
                );
            } catch (err) {
                wwLib.wwLog.error(err);
            }
            this.options.setLoadingStatus(false);
        },
    },
    created() {
        this.settings = this.options.data.settings || this.settings;
        this.options.result.settings = this.settings;
    },
};
</script>

<style scoped lang="scss">
.ww-popup-ghost-configuration {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .ghost-configuration {
        &__label {
            display: flex;
            align-items: center;
            font-weight: 500;
            color: var(--ww-color-dark-500);
            margin-bottom: var(--ww-spacing-01);
            &-required {
                margin-left: auto;
                color: var(--ww-color-dark-400);
            }
        }
        &__input {
            margin-bottom: var(--ww-spacing-03);
        }
    }
}
</style>
