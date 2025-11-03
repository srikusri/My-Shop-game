export interface Currency {
  code: string;
  symbol: string;
  name: string;
  position: 'before' | 'after'; // Symbol position relative to amount
}

export const AVAILABLE_CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', position: 'before' },
  { code: 'EUR', symbol: '€', name: 'Euro', position: 'before' },
  { code: 'GBP', symbol: '£', name: 'British Pound', position: 'before' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', position: 'before' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', position: 'before' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', position: 'before' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', position: 'before' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', position: 'before' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', position: 'before' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', position: 'after' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', position: 'before' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', position: 'before' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', position: 'before' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', position: 'before' },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso', position: 'before' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', position: 'before' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', position: 'before' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', position: 'before' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', position: 'before' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', position: 'before' }
];

