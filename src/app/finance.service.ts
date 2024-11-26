import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor() { }
  private transactions: Transaction[] = [
    { id: 1, type: 'income', amount: 5000, description: 'Salary', date: '2024-11-01' },
    { id: 2, type: 'expense', amount: 1000, description: 'Grocery', date: '2024-11-02' }
  ];



  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  addTransaction(type: 'income' | 'expense', amount: number, description: string): void {
    const newTransaction: Transaction = {
      id: this.transactions.length + 1,
      type,
      amount,
      description,
      date: new Date().toISOString().split('T')[0] // Get current date in YYYY-MM-DD format
    };
    this.transactions.push(newTransaction);
  }

  deleteTransaction(id: number): void {
    this.transactions = this.transactions.filter(transaction => transaction.id !== id);
  }

  getBalance(): number {
    const income = this.transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = this.transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return income - expense;
  }
}
