import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  item: any = {};
  items: any = [];
  query: any = {
    searchBy: 'All',
    pageNo: 1,
    perPage: 5,
    total : 0
  };
  baseUrl: string = window.location.origin;

  constructor(private http: HttpClient) { }
  setQuery(query: any) {
    this.query = query;
  }

  getQuery() {
    return this.query;
  }

  setItem(item) {
    this.item = item;
  }

  getItem() {
    return this.item;
  }

  setItems(items) {
    this.items = items;
    return;
  }

  deleteItemFromArray(item) {
    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i]._id === item._id) {
            this.items.splice(i, 1);
        }
    }
    return;
  }

  getItems() {
    return this.items;
  }

  clearItems() {
    this.items = [];
    this.query.total = 0;
  }

  getCalculationsBy(query: any) {
    return this.http.get(`${this.baseUrl}/api/getPremiumCalculationsHistory`, { params: query});
  }

  deleteCalculation(calculationID: any) {
    return this.http.delete(`${this.baseUrl}/api/deletePremiumCalculationRecord/${calculationID}`);
  }
  calculatePremium(options: any) {
    return this.http.post(`${this.baseUrl}/api/calculatePremium`, options);
  }
}
