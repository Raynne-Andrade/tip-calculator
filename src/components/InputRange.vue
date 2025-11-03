<script setup lang="ts">

interface Props {
    numberSelected: number,
    minValue: number,
    maxValue: number
}

const props = withDefaults(defineProps<Props>(), {
    numberSelected: 0
})

const emit = defineEmits<{
    'update:number-selected': [value: number]
}>()

const handleNumberChange = (event: Event): void => {
    const target = event.target as HTMLInputElement
    emit('update:number-selected', parseInt(target.value))
}
</script>
<template class='input-range'>
    <div class="input-range__selector">
        <input type="range" :value="numberSelected" @input="handleNumberChange" :min="minValue" :max="maxValue" />
    </div>
</template>
<style scoped lang="scss">
.input-range {

    &__seletor {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    &__value {
        min-width: 50px;
        text-align: center;
        font-weight: 700;
        color: #667eea;
        font-size: 1.1rem;
    }
}
</style>