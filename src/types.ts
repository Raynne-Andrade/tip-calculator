export type Currency = 'USD' | 'EUR';

export interface ResultItem {
  label: string;
  value: number;
}

export interface ExchangeRateData {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export interface ExchangeRateResponse {
  [key: string]: ExchangeRateData;
}

export interface CalculatorPanelProps {
  billAmount: number;
  tipPercentage: number;
  numberOfPeople: number;
  selectedCurrency: Currency;
}

export interface ResultPanelProps {
  billAmount: number;
  tipAmount: number;
  totalAmount: number;
  perPersonAmount: number;
  selectedCurrency: Currency;
  conversionBRL: number | null;
}

export interface iconsProps {
    width: number
    height: number
    color: string
}

export interface SwitchProps {
  selectedCurrency: Currency; 
}