import { Injectable, signal } from '@angular/core';
import { Sale } from '../models/inventory-item.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SalesHistoryService {
  private readonly STORAGE_KEY = 'kids_sales_history';
  private salesHistorySignal = signal<Sale[]>([]);
  
  salesHistory = this.salesHistorySignal.asReadonly();

  constructor(private storageService: StorageService) {
    this.loadSalesHistory();
  }

  private loadSalesHistory(): void {
    const saved = this.storageService.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const sales = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        const salesWithDates = sales.map((sale: any) => ({
          ...sale,
          timestamp: new Date(sale.timestamp),
          items: sale.items.map((item: any) => ({
            ...item,
            item: {
              ...item.item,
              createdAt: new Date(item.item.createdAt),
              updatedAt: new Date(item.item.updatedAt)
            }
          }))
        }));
        this.salesHistorySignal.set(salesWithDates);
      } catch (error) {
        console.error('Error loading sales history:', error);
        this.salesHistorySignal.set([]);
      }
    }
  }

  private saveSalesHistory(): void {
    this.storageService.setItem(this.STORAGE_KEY, JSON.stringify(this.salesHistory()));
  }

  addSale(sale: Sale): void {
    const currentHistory = this.salesHistory();
    const updatedHistory = [sale, ...currentHistory]; // Newest first
    this.salesHistorySignal.set(updatedHistory);
    this.saveSalesHistory();
  }

  getTotalSales(): number {
    return this.salesHistory().reduce((sum, sale) => sum + sale.total, 0);
  }

  getTotalTransactions(): number {
    return this.salesHistory().length;
  }

  getSalesToday(): Sale[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.salesHistory().filter(sale => {
      const saleDate = new Date(sale.timestamp);
      saleDate.setHours(0, 0, 0, 0);
      return saleDate.getTime() === today.getTime();
    });
  }

  getSalesThisWeek(): Sale[] {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return this.salesHistory().filter(sale => 
      new Date(sale.timestamp) >= weekAgo
    );
  }

  getSalesThisMonth(): Sale[] {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    return this.salesHistory().filter(sale => 
      new Date(sale.timestamp) >= firstDayOfMonth
    );
  }

  clearHistory(): void {
    this.salesHistorySignal.set([]);
    this.storageService.removeItem(this.STORAGE_KEY);
  }

  deleteSale(saleId: string): void {
    const updated = this.salesHistory().filter(sale => sale.id !== saleId);
    this.salesHistorySignal.set(updated);
    this.saveSalesHistory();
  }
}

