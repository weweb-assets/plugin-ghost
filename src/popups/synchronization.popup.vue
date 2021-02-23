<template>
    <div class="ww-popup-ghost-sync">
        <button class="ghost-sync__all ww-editor-button -primary -green" @click="syncAll" :disabled="isFetching">
            <div v-if="!isFetching">Synchronize all</div>
            <div v-else>Fetching...</div>
        </button>
        <div class="ghost-sync__row" v-for="(endpoint, index) in settings.privateData.endpoints" :key="index">
            <div class="paragraph-m">{{ endpoint.name || `${endpoint.ressource} (${endpoint.method})` }}</div>
            <div class="caption-m m-auto-left">
                <template v-if="!isEndpointFetching(endpoint)">
                    <template v-if="getSource(endpoint).lastSyncDate">
                        {{ getSource(endpoint).lastSyncDate | dateFromNow }}
                    </template>
                    <template v-else>never synchronized</template>
                </template>
            </div>
            <button
                :disabled="isEndpointFetching(endpoint)"
                class="ww-editor-button -primary -green -small m-left"
                @click="sync(endpoint)"
            >
                <div v-if="!isEndpointFetching(endpoint)">Synchronize endpoint</div>
                <div v-else>Fetching...</div>
            </button>
        </div>
        <div class="ghost-sync__separator"></div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'SynchronizationPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    filters: {
        dateFromNow(date) {
            return moment(date).fromNow();
        },
    },
    data() {
        return {
            isFetching: false,
            endpointsFetching: [],
            settings: {
                privateData: {},
            },
        };
    },
    methods: {
        getSource(endpoint) {
            return wwLib.$store.getters['cms/getData'][endpoint.id] || {};
        },
        isEndpointFetching(endpoint) {
            return this.endpointsFetching.indexOf(endpoint.id) !== -1;
        },
        endpointFetching(endpoint, value) {
            if (value) {
                this.endpointsFetching.push(endpoint.id);
            } else {
                const index = this.endpointsFetching.indexOf(endpoint.id);
                if (index !== -1) this.endpointsFetching.splice(index, 1);
            }
        },
        async sync(endpoint) {
            this.endpointFetching(endpoint, true);
            try {
                await wwLib.wwPlugin.saveCmsDataSet(
                    this.settings.id,
                    endpoint.id,
                    endpoint.name || `${endpoint.ressource} (${endpoint.method})`,
                    endpoint.displayBy,
                    'Ghost'
                );

                wwLib.wwNotification.open({
                    text: {
                        en: `Endpoint "${
                            endpoint.name || `${endpoint.ressource} (${endpoint.method})`
                        }" succesfully fetched`,
                    },
                    color: 'green',
                });
            } catch (err) {
                wwLib.wwNotification.open({
                    text: {
                        en: 'An error occured, please try again later.',
                        fr: 'Une erreur est survenue. Veuillez réessayer plus tard.',
                    },
                    color: 'red',
                });
                wwLib.wwLog.error(err);
            }
            this.endpointFetching(endpoint, false);
        },
        async syncAll() {
            this.isFetching = true;
            for (const endpoint of this.settings.privateData.endpoints) await this.sync(endpoint);
            this.isFetching = false;
        },
    },
    created() {
        this.settings = this.options.data.settings;
    },
    mounted() {
        if (this.options.data.isFirstTime) this.syncAll();
    },
};
</script>

<style scoped lang="scss">
.ww-popup-ghost-sync {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .ghost-sync {
        &__all {
            margin: 0 auto var(--ww-spacing-02) auto;
        }
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
