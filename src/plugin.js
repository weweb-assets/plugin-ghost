/* wwEditor:start */
import './popups';
/* wwEditor:end */

export default {
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        Data
    \================================================================================================*/
    settings: {
        id: wwLib.wwUtils.getUid(),
        data: {},
        privateData: {
            contentApiKey: '33279d40c8781c9e0fbb6ea44e',
            adminApiKey: '602b9da7ef4cdf003929c798:0e998d1cabd637f9c8d6ee43fc84a7b75654d42f657d0ac469e961f393f0f75e',
            url: 'https://markmilastsivy.ghost.io',
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
        /* wwEditor:end */
    },
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        SIDEBAR POPUP
    \================================================================================================*/
    async sidebarButton() {
        try {
            const { id, settings } = wwLib.wwPlugins.pluginGhost;
            await wwLib.wwPopups.open({
                firstPage: settings.privateData.url ? 'GHOST_POPUP' : 'GHOST_CONFIGURATION_POPUP',
                data: {
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
