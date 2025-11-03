<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  billAmount: number
  tipAmount: number
  totalAmount: number
  perPersonAmount: number
  selectedCurrency: 'USD' | 'EUR'
  conversionBRL: number | null
}

const props = withDefaults(defineProps<Props>(), {
  billAmount: 0,
  tipAmount: 0,
  totalAmount: 0,
  perPersonAmount: 0,
  selectedCurrency: 'USD',
})

const emit = defineEmits<{
  back: []
}>()

interface Item {
  label: string,
  value: number
}

const BillValues = computed<Item[]>(() => [
  { label: 'Gorjeta', value: props.tipAmount },
  { label: 'Conta', value: props.billAmount },
  { label: 'Por pessoa', value: props.perPersonAmount },
  { label: 'Total', value: props.totalAmount }
])

const currencySymbol = computed<string>(() => {
  return props.selectedCurrency === 'EUR' ? '€' : '$'
})

const formatCurrency = (value: number): string => {
  return value.toFixed(2)
}
</script>

<template>
  <div class="result-panel">
    <h2 class="result">Resultado</h2>

    <div class="result-panel__grid">
      <div v-for="bill in BillValues" :key="bill.label" class="result-panel__item">
        <span class="result-panel__label">{{ bill.label }}</span>
        <span class="result-panel__value">{{ currencySymbol }}{{ formatCurrency(bill.value) }}</span>
      </div>
    </div>

    <div v-if="conversionBRL" class="result-panel__conversion-box">
      <p class="result-panel__conversion-label">Conversão para BRL:</p>
      <p class="result-panel__conversion-value">R$ {{ formatCurrency(conversionBRL) }}</p>
    </div>

  </div>
</template>

<style scoped lang="scss">
.result-panel {
  width: 100%;
  animation: slideIn 0.3s ease-out;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  &__item {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &__label {
    font-size: 0.9rem;
    color: #666;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  &__value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;

    &--total {
      color: #667eea;
      font-size: 1.8rem;
    }
  }

  &__conversion-box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__conversion-label {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-bottom: 0.5rem;
  }

  &__conversion-value {
    font-size: 2rem;
    font-weight: 700;
  }
}
</style>
