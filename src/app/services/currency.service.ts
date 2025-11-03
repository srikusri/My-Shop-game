import { Injectable, signal, computed } from '@angular/core';
import { Currency, AVAILABLE_CURRENCIES } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly CURRENCY_KEY = 'kids_currency';
  
  private currencySignal = signal<Currency>(this.getDefaultCurrency());
  
  currency = this.currencySignal.asReadonly();
  currencySymbol = computed(() => this.currencySignal().symbol);
  currencyCode = computed(() => this.currencySignal().code);
  availableCurrencies = AVAILABLE_CURRENCIES;

  constructor() {
    this.loadCurrency();
  }

  private getDefaultCurrency(): Currency {
    // Default to USD
    return AVAILABLE_CURRENCIES[0];
  }

  private loadCurrency(): void {
    const saved = localStorage.getItem(this.CURRENCY_KEY);
    if (saved) {
      try {
        const currencyCode = saved;
        const currency = AVAILABLE_CURRENCIES.find(c => c.code === currencyCode);
        if (currency) {
          this.currencySignal.set(currency);
        }
      } catch (error) {
        console.error('Error loading currency:', error);
      }
    }
  }

  private saveCurrency(): void {
    localStorage.setItem(this.CURRENCY_KEY, this.currencySignal().code);
  }

  setCurrency(currencyCode: string): void {
    const currency = AVAILABLE_CURRENCIES.find(c => c.code === currencyCode);
    if (currency) {
      this.currencySignal.set(currency);
      this.saveCurrency();
    }
  }

  /**
   * Format an amount with the current currency
   * @param amount The numeric amount to format
   * @param decimals Number of decimal places (default: 2)
   * @returns Formatted string with currency symbol
   */
  format(amount: number, decimals: number = 2): string {
    const currency = this.currencySignal();
    const formattedAmount = amount.toFixed(decimals);
    
    if (currency.position === 'before') {
      return `${currency.symbol}${formattedAmount}`;
    } else {
      return `${formattedAmount}${currency.symbol}`;
    }
  }

  /**
   * Get just the symbol for the current currency
   */
  getSymbol(): string {
    return this.currencySignal().symbol;
  }

  /**
   * Get the current currency object
   */
  getCurrentCurrency(): Currency {
    return this.currencySignal();
  }
}

