import settingsPopup from './settings.popup.vue';
import configurationPopup from './configuration.popup.vue';
import endpointsPopup from './endpoints.popup.vue';
import endpointPopup from './endpoint.popup.vue';
import synchronizationPopup from './synchronization.popup.vue';
import webhooksPopup from './webhooks.popup.vue';

wwLib.wwPopups.addPopup('ghostSettingsPopup', settingsPopup);
wwLib.wwPopups.addPopup('ghostConfigurationPopup', configurationPopup);
wwLib.wwPopups.addPopup('ghostEndpointsPopup', endpointsPopup);
wwLib.wwPopups.addPopup('ghostEndpointPopup', endpointPopup);
wwLib.wwPopups.addPopup('ghostSynchronizationPopup', synchronizationPopup);
wwLib.wwPopups.addPopup('ghostWebhooksPopup', webhooksPopup);

wwLib.wwPopups.addStory('GHOST_POPUP', {
    title: {
        en: 'Ghost',
        fr: 'Ghost',
    },
    type: 'ghostSettingsPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
});

wwLib.wwPopups.addStory('GHOST_CONFIGURATION_POPUP', {
    title: {
        en: 'Ghost - Configuration',
        fr: 'Ghost - Configuration',
    },
    type: 'ghostConfigurationPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save configuration',
                fr: 'Enregistrer la configuration',
            },
            next: 'GHOST_ENDPOINTS_POPUP',
        },
    },
});

wwLib.wwPopups.addStory('GHOST_ENDPOINTS_POPUP', {
    title: {
        en: 'Ghost - Endpoints',
        fr: 'Ghost - Endpoints',
    },
    type: 'ghostEndpointsPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save endpoints',
                fr: 'Enregistrer les endpoints',
            },
            next: 'GHOST_SYNCHRONIZATION_POPUP',
        },
    },
});

wwLib.wwPopups.addStory('GHOST_ADD_ENDPOINT_POPUP', {
    title: {
        en: 'Ghost - Add endpoint',
        fr: 'Ghost - Ajouter un endpoint',
    },
    type: 'ghostEndpointPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Add endpoint',
                fr: 'Ajouter un endpoint',
            },
        },
    },
});

wwLib.wwPopups.addStory('GHOST_EDIT_ENDPOINT_POPUP', {
    title: {
        en: 'Ghost - Edit endpoint',
        fr: 'Ghost - Editer la endpoint',
    },
    type: 'ghostEndpointPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Edit endpoint',
                fr: 'Editer le endpoint',
            },
        },
    },
});

wwLib.wwPopups.addStory('GHOST_WEBHOOKS_POPUP', {
    title: {
        en: 'Ghost - Webhooks',
        fr: 'Ghost - Webhooks',
    },
    type: 'ghostWebhooksPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        DONE: {
            text: {
                en: 'Done',
                fr: 'Done',
            },
        },
    },
});

wwLib.wwPopups.addStory('GHOST_SYNCHRONIZATION_POPUP', {
    title: {
        en: 'Ghost - Synchronization',
        fr: 'Ghost - Synchronization',
    },
    type: 'ghostSynchronizationPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        DONE: {
            text: {
                en: 'Done',
                fr: 'Done',
            },
        },
    },
});
