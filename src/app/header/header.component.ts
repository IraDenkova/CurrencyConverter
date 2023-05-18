import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  dollarRate: number | null = null
  euroRate: number | null = null

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://v6.exchangerate-api.com/v6/04929ddf57a083bbc98d390b/latest/USD')
      .subscribe((data: any) => {
        this.dollarRate = data.conversion_rates.UAH.toFixed(2)
      })

    this.http.get('https://v6.exchangerate-api.com/v6/823bc6c09b37dbfc1bc77146/latest/EUR')
      .subscribe((data: any) => {        
        this.euroRate = data.conversion_rates.UAH.toFixed(2)
      })
  }
}