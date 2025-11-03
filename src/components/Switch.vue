<script setup lang="ts">
import { Currency, SwitchProps } from '../types';

const props = defineProps<SwitchProps>();

const emit = defineEmits<{
    (e: 'update:currency', value: Currency): void;
}>();

const handleCurrencyChange = (currency: 'USD' | 'EUR'): void => {
    emit('update:currency', currency === 'USD' ? 'EUR' : 'USD')
}

</script>
<template>
    <section class="switch" @click="handleCurrencyChange(selectedCurrency)">

        <span :class="selectedCurrency === 'USD' ? 'switch__label--USDselect' : 'switch__label'">
            USD
        </span>

        <div class="switch__input" :class="selectedCurrency === 'USD' ? 'switch__input--USD' : 'switch__input--EUR'">
            <div class="switch__toggle"
                :class="selectedCurrency === 'USD' ? 'switch__toggle--USD' : 'switch__toggle--EUR'"></div>
        </div>

        <span :class="selectedCurrency === 'EUR' ? 'switch__label--EURselect' : 'switch__label'">
            EUR
        </span>

    </section>
</template>
<style scoped lang="scss">
.switch {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    user-select: none;

    &__label {
        color: rgb(66, 63, 63);

        &--USDselect {
            color: green;
            font-weight: bold;
        }

        &--EURselect {
            color: blue;
            font-weight: bold;
        }
    }

    &__input {
        width: 48px;
        border-radius: 12px;
        position: relative;
        transition: color 300ms, background-color 300ms, border-color 300ms;
        height: 24px;

        &--USD {
            background: green;
        }

        &--EUR {
            background: blue;
        }
    }

    &__toggle {
        width: 20px;
        height: 20px;
        background: #eee;
        border-radius: 100%;
        position: absolute;
        top: 0.125rem;
        transition: all 300ms;

        &--USD {
            left: 0.2rem;
        }

        &--EUR {
            right: 0.2rem;

        }
    }

}
</style>