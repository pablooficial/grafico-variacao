import { Component, Input } from '@angular/core';
import { IVariation } from 'src/app/core/models/variation.model';

@Component({
  selector: 'app-table-variation',
  templateUrl: './table-variation.component.html',
  styleUrls: ['./table-variation.component.scss']
})
export class TableVariationComponent {
  @Input() dataBase: IVariation[] = [];

  displayedColumns: string[] = [
    'day',
    'date',
    'price',
    'variationDMinusOne',
    'firstDateVariation',
  ];
}
