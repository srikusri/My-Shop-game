import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryManagementComponent } from './components/inventory-management/inventory-management.component';
import { SalesComponent } from './components/sales/sales.component';
import { GameHeaderComponent } from './components/game-header/game-header.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SalesHistoryComponent } from './components/sales-history/sales-history.component';
import { AppMode } from './models/inventory-item.model';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    InventoryManagementComponent,
    SalesComponent,
    GameHeaderComponent,
    AchievementsComponent,
    SettingsComponent,
    SalesHistoryComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  currentMode = signal<AppMode>(AppMode.INVENTORY);
  AppMode = AppMode;

  constructor(public gameService: GameService) {}

  switchMode(mode: AppMode): void {
    this.currentMode.set(mode);
  }
}

