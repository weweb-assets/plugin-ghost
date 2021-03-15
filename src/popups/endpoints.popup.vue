<template>
    <div class="ww-popup-ghost-content-types">
        <button class="ghost-content-types__all ww-editor-button -primary" @click="addEndpoint">Add endpoint</button>
        <div class="ghost-content-types__row" v-for="(endpoint, index) in settings.privateData.endpoints" :key="index">
            <div class="paragraph-m">{{ endpoint.name || `${endpoint.ressource} (${endpoint.method})` }}</div>
            <button class="ww-editor-button -secondary -small m-auto-left" @click="editEndpoint(index, endpoint)">
                Edit
            </button>
            <div class="ghost-content-types__button-delete m-left" @click="deleteEndpoint(index)">
                <wwEditorIcon name="delete" small />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EndpointsPopup',
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
    watch: {
        isSetup() {
            this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
        },
    },
    computed: {
        isSetup() {
            return this.settings.privateData.endpoints && this.settings.privateData.endpoints.length;
        },
    },
    methods: {
        async addEndpoint() {
            try {
                const result = await wwLib.wwPopups.open({
                    firstPage: 'GHOST_ADD_ENDPOINT_POPUP',
                    data: { url: this.settings.privateData.url },
                });
                this.settings.privateData.endpoints.push(result.endpoint);
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async editEndpoint(index, endpoint) {
            try {
                const result = await wwLib.wwPopups.open({
                    firstPage: 'GHOST_EDIT_ENDPOINT_POPUP',
                    data: { url: this.settings.privateData.url, endpoint },
                });
                this.settings.privateData.endpoints.splice(index, 1, result.endpoint);
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async deleteEndpoint(index) {
            const confirm = await wwLib.wwModals.open({
                title: {
                    en: 'Delete data source?',
                    fr: 'Supprimer la source de données?',
                },
                text: {
                    en:
                        'Are you sure you want to delete this data source? All elements binded to this data source will be unbind.',
                    fr:
                        'Voulez-vous vraiment supprimer la source de données ? Tous les éléments liés à cette source de données seront dissociés.',
                },
                buttons: [
                    {
                        text: {
                            en: 'Cancel',
                            fr: 'Annuler',
                        },
                        color: '-secondary',
                        value: false,
                        escape: true,
                    },
                    {
                        text: {
                            en: 'Delete',
                            fr: 'Supprimer',
                        },
                        color: '-primary -red',
                        value: true,
                        enter: true,
                    },
                ],
            });
            if (!confirm) return;
            this.settings.privateData.endpoints.splice(index, 1);
        },
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

                const oldEndpoints = this.options.data.settings.privateData.endpoints;
                const newEndpoints = this.options.result.settings.privateData.endpoints;
                const deletedEndpoints = oldEndpoints.filter(
                    endpoint => !newEndpoints.find(elem => elem.id === endpoint.id)
                );
                deletedEndpoints.forEach(endpoint => wwLib.wwPlugin.deleteCmsDataSet(endpoint.id));

                wwLib.wwPlugins.pluginGhost.settings = plugin.settings;
                this.options.data.settings = plugin.settings;
            } catch (err) {
                wwLib.wwLog.error(err);
            }
            this.options.setLoadingStatus(false);
        },
    },
    created() {
        this.settings = _.cloneDeep(this.options.data.settings || this.settings);
        this.options.result.settings = this.settings;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-ghost-content-types {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .ghost-content-types {
        &__all {
            margin: 0 auto var(--ww-spacing-02) auto;
        }
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: var(--ww-spacing-04);
        }
        &__button-delete {
            margin: 0 var(--ww-spacing-03);
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
        margin-left: var(--ww-spacing-03);
    }
}
</style>
