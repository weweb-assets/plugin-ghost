/* wwEditor:start */
import './popups';
/* wwEditor:end */

export default {
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        Data
    \================================================================================================*/
    settings: {
        data: {},
        privateData: {
            contentApiKey: '',
            adminApiKey: '',
            url: '',
            endpoints: [],
        },
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        Init
    \================================================================================================*/
    async init() {
        /* wwEditor:start */
        const plugin = wwLib.wwPlugins.pluginGhost;
        if (plugin.id) plugin.settings = (await wwLib.wwPlugin.getSettings(plugin.id)) || this.settings;
        if (!plugin.settings.privateData.contentApiKey) plugin.settings.privateData.contentApiKey = '';
        if (!plugin.settings.privateData.adminApiKey) plugin.settings.privateData.adminApiKey = '';
        if (!plugin.settings.privateData.endpoints) plugin.settings.privateData.url = '';
        if (!plugin.settings.privateData.endpoints) plugin.settings.privateData.endpoints = [];
        if (
            !plugin.settings.privateData.contentApiKey.length ||
            !plugin.settings.privateData.adminApiKey.length ||
            !plugin.settings.privateData.url.length
        ) {
            this.sidebarButton();
        }
        /* wwEditor:end */
    },
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        SIDEBAR POPUP
    \================================================================================================*/
    async sidebarButton() {
        try {
            const { id, settings } = wwLib.wwPlugins.pluginGhost;
            const isSetup =
                !settings.privateData.contentApiKey.length ||
                !settings.privateData.adminApiKey.length ||
                !settings.privateData.url.length;
            const isFirstTime = !settings.privateData.endpoints.length;
            await wwLib.wwPopups.open({
                firstPage: isSetup ? 'GHOST_POPUP' : 'GHOST_CONFIGURATION_POPUP',
                data: {
                    isFirstTime,
                    pluginId: id,
                    settings,
                },
            });
        } catch (err) {
            wwLib.wwLog.error(err);
        }
    },
    /* wwEditor:end */
};
