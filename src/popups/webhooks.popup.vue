<template>
    <div class="ww-popup-ghost-webhooks">
        <div class="ghost-webhooks__row" v-for="(endpoint, index) in settings.privateData.endpoints" :key="index">
            <div class="paragraph-m">{{ endpoint.name || `${endpoint.ressource} (${endpoint.method})` }}</div>
            <button class="ww-editor-button -primary -green -small m-auto-left" @click="copyUrl(endpoint)">
                <wwEditorIcon class="ww-editor-button-icon -left" name="copy-paste" small />
                Copy url
            </button>
            <a
                class="ww-editor-button -secondary -small m-left"
                :href="`//${settings.privateData.url}/ghost/#/settings/integrations`"
                target="_blank"
            >
                <wwEditorIcon class="ww-editor-button-icon -left" name="open-out" small />
                Setup webhook
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WebhooksPopup',
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
                privateData: {},
            },
        };
    },
    methods: {
        async copyUrl(endpoint) {
            const designId = wwLib.wwWebsiteData.getInfo().id;
            await wwLib
                .getManagerWindow()
                .navigator.clipboard.writeText(
                    `https://data.weweb.io/designs/${designId}/cms_data_set/${endpoint.id}/callback`
                );
            wwLib.wwNotification.open({
                text: {
                    en: 'Url copied to clipboard',
                },
                color: 'green',
            });
        },
    },
    created() {
        this.settings = this.options.data.settings;
    },
};
</script>

<style scoped lang="scss">
.ww-popup-ghost-webhooks {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .ghost-webhooks {
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: var(--ww-spacing-04);
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
