import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FinanceComponent } from './finance/finance.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FinanceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'finance-tracker';
}
