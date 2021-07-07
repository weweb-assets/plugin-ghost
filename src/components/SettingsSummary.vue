<template>
    <div class="ghost-settings-summary">
        <wwEditorIcon name="link" class="ghost-settings-summary__icon"></wwEditorIcon>
        <span class="caption-m">{{ settings.privateData.url }}</span>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
};
</script>

<style lang="scss" scoped>
.ghost-settings-summary {
    display: flex;
    align-items: center;
    &__icon {
        margin-right: var(--ww-spacing-02);
    }
}
</style>
