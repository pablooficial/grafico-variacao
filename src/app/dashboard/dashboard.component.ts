import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../core/services/finance.service';
import { interval, Subscription } from 'rxjs';
import { IVariation } from '../core/models/variation.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  nomeAtivo = 'PETR4.SA';
  updateData = true;
  displayLimit = 30;
  time = 60 * 1000;
  variation: IVariation[] = [];

  private updateSubscription: Subscription;

  constructor(private financeService: FinanceService) {
    this.updateSubscription = interval(this.time).subscribe(() => {
      this.getVariances();
    });
  }

  ngOnInit(): void {
    this.getVariances();
  }

  onChange = () => {
    if (!this.updateData) {
      this.updateSubscription.unsubscribe();
    } else {
      this.getVariances();
      this.updateSubscription = interval(this.time).subscribe(() => {
        this.getVariances();
      });
    }
  };

  getVariances(): void {
    this.financeService
      .getAll(this.nomeAtivo, this.displayLimit)
      .subscribe((items) => {
        this.variation = items;
      });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
