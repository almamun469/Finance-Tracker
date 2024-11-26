import { Component, OnInit } from '@angular/core';
import { FinanceService, Transaction } from '../finance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [FormsModule,TitleCasePipe,CurrencyPipe,CommonModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css'
})
export class FinanceComponent implements OnInit{

  transactions: Transaction[] = [];
  newAmount: number = 0;
  newDescription: string = '';
  newType: 'income' | 'expense' = 'income';
  balance: number = 0;

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.updateBalance();
  }

  loadTransactions(): void {
    this.financeService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  addTransaction(): void {
    if (this.newAmount > 0 && this.newDescription.trim()) {
      this.financeService.addTransaction(this.newType, this.newAmount, this.newDescription);
      this.newAmount = 0;
      this.newDescription = '';
      this.updateBalance();
      this.loadTransactions();
    }
  }

  deleteTransaction(transaction: Transaction): void {
    this.financeService.deleteTransaction(transaction.id);
    this.updateBalance();
    this.loadTransactions();
  }

  updateBalance(): void {
    this.balance = this.financeService.getBalance();
  }

}
