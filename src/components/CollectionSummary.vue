<template>
    <div class="ghost-collection-summary">
        <div class="ghost-collection-summary__elem caption-s">Method: {{ config.method || '-' }}</div>
        <div class="ghost-collection-summary__elem caption-s">Ressource: {{ config.ressource || '-' }}</div>
    </div>
</template>

<script>
export default {
    props: {
        config: { type: Object, required: true },
    },
};
</script>

<style lang="scss" scoped>
.ghost-collection-summary {
    &__elem {
        margin-bottom: var(--ww-spacing-01);
    }
}
</style>
