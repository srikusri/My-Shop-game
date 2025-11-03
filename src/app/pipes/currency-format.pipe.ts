import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Pipe({
  name: 'currencyFormat',
  standalone: true,
  pure: false // Update when currency changes
})
export class CurrencyFormatPipe implements PipeTransform {
  constructor(private currencyService: CurrencyService) {}

  transform(value: number, decimals: number = 2): string {
    if (value === null || value === undefined) {
      return this.currencyService.format(0, decimals);
    }
    return this.currencyService.format(value, decimals);
  }
}

