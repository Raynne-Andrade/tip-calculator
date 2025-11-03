<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCurrency } from './services/useCurrency';
import CalculatorPanel from './components/CalculatorPanel.vue'
import ResultPanel from './components/ResultPanel.vue'
import Next from './components/icons/next.vue';
import Back from './components/icons/back.vue';

import { Currency } from './types';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const showResultInMobile = ref<boolean>(false)
const billAmount = ref<number>(0)
const tipPercentage = ref<number>(10)
const numberOfPeople = ref<number>(2)
const selectedCurrency = ref<Currency>('USD');

const { exchangeRate, conversionBRL, fetchExchangeRate } = useCurrency(selectedCurrency);


const tipAmount = computed<number>(() => {
  return (billAmount.value * tipPercentage.value) / 100
})

const totalAmount = computed<number>(() => {
  return billAmount.value + tipAmount.value
})

const perPersonAmount = computed<number>(() => {
  handleCalculate();
  return numberOfPeople.value > 0 ? totalAmount.value / numberOfPeople.value : 0
})

const convertToBRL = () => {
  if (exchangeRate.value && exchangeRate.value.BRL) {
    conversionBRL.value = perPersonAmount.value * exchangeRate.value.BRL;
  }
};

const handleCalculate = async (): Promise<void> => {
  if (billAmount) {
    await fetchExchangeRate();
  }
}

const handleBack = (): void => {
  showResultInMobile.value = false
}

const handleNext = (): void => {
  showResultInMobile.value = true
}

const handleCurrencyChange = (newCurrency: 'USD' | 'EUR'): void => {
  selectedCurrency.value = newCurrency
}

watch(selectedCurrency, handleCalculate)
watch([perPersonAmount, exchangeRate], convertToBRL);

</script>

<template>
  <div class="tip-calculator">
    <header class="tip-calculator__header">
      <h1>Le/Tip</h1>
      <p>Calculadora de Gorjeta</p>
    </header>

    <main class="tip-calculator__container">
      <CalculatorPanel v-if="!showResultInMobile || !isMobile" :bill-amount="billAmount" :tip-percentage="tipPercentage"
        :number-of-people="numberOfPeople" :selected-currency="selectedCurrency"
        @update:bill-amount="billAmount = $event" @update:tip-percentage="tipPercentage = $event"
        @update:number-of-people="numberOfPeople = $event" @update:currency="handleCurrencyChange" />

      <ResultPanel v-if="showResultInMobile || !isMobile" :bill-amount="billAmount" :tip-amount="tipAmount"
        :total-amount="totalAmount" :conversionBRL='conversionBRL' :per-person-amount="perPersonAmount"
        :selected-currency="selectedCurrency" :conversion-brl="conversionBRL" />

      <span v-if="isMobile && billAmount" class='tip-calculator__button'>
        <Back v-if="showResultInMobile" @click="handleBack" />
        <Next v-else @click="handleNext" />
      </span>

    </main>
  </div>
</template>

<style scoped lang="scss">
.tip-calculator {
  width: 97dvw;
  min-height: 100dvh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  background: linear-gradient(135deg, #a8da21 0%, #009900 100%);

  @media (max-width: 768px) {
    padding: 0;
  }


  &__header {
    margin-inline: auto
  }

  &__container {
    background: white;
    border-radius: 12px;
    display: flex;
    flex: 1;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    max-height: fit-content;

    @media (max-width: 768px) {
      flex-direction: column;
      width: 320px;
    }

  }

  &__button {
    background: green;
    border-radius: 100%;
    padding: 10px 15px;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 80%;

  }
}
</style>