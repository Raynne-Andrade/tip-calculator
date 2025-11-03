<script setup lang="ts">
import { computed } from 'vue'
import Switch from './Switch.vue'
import InputRange from './InputRange.vue'
import { Currency, CalculatorPanelProps } from '../types';

const props = withDefaults(defineProps<CalculatorPanelProps>(), {
  billAmount: 0,
  tipPercentage: 10,
  numberOfPeople: 2,
  selectedCurrency: 'USD' as Currency,
});


const emit = defineEmits<{
  (e: 'update:bill-amount', value: number): void;
  (e: 'update:tip-percentage', value: number): void;
  (e: 'update:number-of-people', value: number): void;
  (e: 'update:currency', value: Currency): void;
}>();

const currencySymbol = computed<string>(() => {
  return props.selectedCurrency === 'EUR' ? '€' : '$'
})


const handleCurrencyChange = (newCurrency: 'USD' | 'EUR'): void => {
  emit('update:currency', newCurrency)

}

const handleBillAmountChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:bill-amount', parseFloat(target.value) || 0)
}

const handleTipPercentageChange = (newPercentage: number): void => {
  emit('update:tip-percentage', newPercentage)
}

const handleNumberOfPeopleChange = (newNumberOfPeople: number): void => {
  emit('update:number-of-people', newNumberOfPeople)
}
</script>

<template>
  <section class="input-panel">
    <h2 class='input-panel__title'>Calcule sua Gorjeta</h2>

    <div class="input-panel__section">
      <label class='input-panel__label'>Moeda:</label>
      <Switch :selected-currency="selectedCurrency" @update:currency="handleCurrencyChange" />
    </div>

    <div class="input-panel__section">
      <label for="bill" class='input-panel__label'>Valor da Conta ({{ currencySymbol }})</label>
      <input id="bill" type="number" class="input-panel__bill" :value="billAmount" @input="handleBillAmountChange"
        placeholder="0.00" min="0" step="0.01" />
    </div>

    <div class="input-panel__section">
      <div class="input-panel__range">
        <label for="tip" class='input-panel__label'>Gorjeta (%)</label>
        <span class='input-panel__range-result'>{{ tipPercentage }}%</span>
      </div>
      <InputRange @update:number-selected="handleTipPercentageChange" :minValue='10' :maxValue="20"
        :numberSelected="tipPercentage" />
    </div>

    <div class="input-panel__section">
      <div class="input-panel__range">
        <label for="people" class='input-panel__label'>Numero de Pessoas</label> <span
          class='input-panel__range-result'>{{ numberOfPeople }}</span>
      </div>
      <InputRange @update:number-selected="handleNumberOfPeopleChange" :minValue='2' :maxValue="16"
        :numberSelected='numberOfPeople' />
    </div>

  </section>
</template>

<style lang="scss" scoped>
.input-panel {
  min-width: 400px;

  @media (max-width: 768px) {
    min-width: 320px;
  }

  &__title {
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }


  &__section {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  &__label {
    color: #555;
    font-weight: 500;
  }

  &__bill {
    background: transparent;
    border: 1px solid #c1afaf;
    border-radius: 8px;
    -webkit-appearance: textfield;
    appearance: textfield;
    height: 25px;
    color: #333;

    &:focus {
      outline: none;
    }
  }

  &__range {
    width: 100%;
    gap: 20px;
    display: flex;
    align-items: center;
  }

  &__range-result {
    color: #667eea;
    font-size: 20px;
    font-weight: 600;
  }

}
</style>