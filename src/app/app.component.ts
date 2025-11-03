import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryManagementComponent } from './components/inventory-management/inventory-management.component';
import { SalesComponent } from './components/sales/sales.component';
import { GameHeaderComponent } from './components/game-header/game-header.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { SalesHistoryComponent } from './components/sales-history/sales-history.component';
import { PersonaSelectionComponent } from './components/persona-selection/persona-selection.component';
import { WalletDisplayComponent } from './components/wallet-display/wallet-display.component';
import { QrScannerPaymentComponent } from './components/qr-scanner-payment/qr-scanner-payment.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { AppMode } from './models/inventory-item.model';
import { GameService } from './services/game.service';
import { WalletService } from './services/wallet.service';
import { PersonaType } from './models/wallet.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    InventoryManagementComponent,
    SalesComponent,
    GameHeaderComponent,
    AchievementsComponent,
    SalesHistoryComponent,
    PersonaSelectionComponent,
    WalletDisplayComponent,
    QrScannerPaymentComponent,
    CurrencyFormatPipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  currentMode = signal<AppMode>(AppMode.INVENTORY);
  showQRScanner = signal(false);
  AppMode = AppMode;
  PersonaType = PersonaType;

  constructor(
    public gameService: GameService,
    public walletService: WalletService
  ) {}

  switchMode(mode: AppMode): void {
    this.currentMode.set(mode);
  }

  openPaymentScanner(): void {
    if (this.walletService.persona()?.type === PersonaType.BUYER) {
      this.showQRScanner.set(true);
    }
  }

  closePaymentScanner(): void {
    this.showQRScanner.set(false);
  }

  onPaymentCompleted(): void {
    this.showQRScanner.set(false);
    // Payment completed, buyer has paid
  }
}

