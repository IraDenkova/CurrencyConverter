import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
  animations: [
    trigger('lineAnimation', [
      state('in', style({ width: '100%' })),
      transition('void => *', [
        style({ width: '0' }),
        animate('0.3s ease-out')
      ]),
      transition('* => void', [
        animate('0.3s ease-out', style({ width: '0' }))
      ])
    ])
  ]
})

export class ConversionComponent {
  baseCurrency = 'USD'
  targetCurrency = 'UAH'
  baseAmount = 1;
  targetAmount!: number 
  exchangeRate!: number 

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.convertCurrency();
  }

  convertCurrency() {
    this.http.get(`https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`)
      .subscribe((data: any) => {
        this.exchangeRate = data.rates[this.targetCurrency];
        this.targetAmount = parseFloat((this.baseAmount * this.exchangeRate).toFixed(2));
      });
  }

  onBaseAmountChange() {
    this.targetAmount = parseFloat((this.baseAmount * this.exchangeRate).toFixed(2));
  }

  onTargetAmountChange() {
    this.baseAmount = parseFloat((this.targetAmount / this.exchangeRate).toFixed(2));
  }
  
  onFirstInputFocus = false;
  onSecondInputFocus = false;
}