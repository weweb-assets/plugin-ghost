export default {
    features: {
        datasource: true
    },
    editor: {
        settings: {
            edit: () => import('./src/components/SettingsEdit.vue'),
            summary: () => import('./src/components/SettingsSummary.vue'),
            getIsValid(settings) {
                return (
                    !!settings.privateData.contentApiKey &&
                    !!settings.privateData.adminApiKey &&
                    !!settings.privateData.url
                );
            },
        },
        collection: {
            edit: () => import('./src/components/CollectionEdit.vue'),
            summary: () => import('./src/components/CollectionSummary.vue'),
            getIsValid(config) {
                return !!config.ressource && !!config.method;
            },
        },
    },
};
