// src/composables/useCurrency.ts

import { ref, watch } from 'vue';
import { ExchangeRateResponse, Rates, Currency } from '../types';

export function useCurrency(selectedCurrency: Ref<Currency>) {
  const exchangeRate = ref<Rates | null>(null);
  const conversionBRL = ref<number | null>(null);
  const error = ref<string | null>(null);


  const fetchExchangeRate = async () => {
    error.value = null; 
    exchangeRate.value = null; 

    const currencyPair = `${selectedCurrency.value}-BRL`;
    const url = `https://economia.awesomeapi.com.br/json/last/${currencyPair}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro ao buscar taxa de câmbio: ${response.statusText}`);
      }

      const data: ExchangeRateResponse = await response.json();
      const rateData = data[`${selectedCurrency.value}BRL`];

      if (rateData && rateData.bid) {
        const rate = parseFloat(rateData.bid);
        exchangeRate.value = { BRL: rate };
      } else {
        throw new Error('Dados de cotação inválidos ou incompletos.');
      }
    } catch (e) {
      console.error('Erro ao buscar taxa de câmbio:', e);
      error.value = 'Não foi possível obter a taxa de câmbio. Verifique sua conexão ou tente novamente mais tarde.';
    }
  };

  watch(selectedCurrency, fetchExchangeRate, { immediate: true });

  return {
    exchangeRate,
    conversionBRL,
    error,
    fetchExchangeRate,
  };
}
