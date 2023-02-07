import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageService } from './message.service';
import { IFinance } from '../models/finance.model';
import { IVariation } from '../models/variation.model';


@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private financeUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAll(ativo: string, limit = 30): Observable<IVariation[]> {
    return this.http.get<IFinance>(`${this.financeUrl}/${ativo}`).pipe(
      map((finance: IFinance) => this.formattedResult(finance, limit)),
      tap(() => this.log(`Consultou o ativo: ${ativo}`))
    );
  }

  private formattedResult(finance: IFinance, limit: number): IVariation[] {
    try {
      const result = finance.chart.result[0];
      const timestamps = result.timestamp.slice(limit * -1);
      const quotes = result.indicators.quote[0].open.slice(limit * -1);
      const variances = quotes.map((price: any, index: number) => {
        const date = timestamps[index] * 1000;

        let variationDMinusOne = 0;
        let firstDateVariation = 0;

        if (index > 0 && price > 0) {
          variationDMinusOne = this.calculateVariance(price, quotes[index - 1]);
          firstDateVariation = this.calculateVariance(price, quotes[0]);
        }

        return {
          day: index,
          date,
          price: price || 0,
          variationDMinusOne,
          firstDateVariation,
        } as IVariation;
      });

      return variances;
    } catch (e) {
      return [];
    }
  }

  private getValuePercent(value: number, nextNumber: number): number {
    return (value * 100) / nextNumber;
  }

  private calculateVariance(currentPrice: number, nextPrice: number) {
    const currentResult = this.getValuePercent(currentPrice, nextPrice);
    return currentResult > 100 ? currentResult - 100 : 100 - currentResult;
  }

  private log(message: string): void {
    this.messageService.add(`FinanceService: ${message}`);
  }
}
