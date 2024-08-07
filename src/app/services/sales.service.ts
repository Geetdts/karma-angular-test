import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private _http:HttpClient) {}

    addSales(data: any): Observable<any> {
      return this._http.post('http://localhost:3000/sales', data);
    }

    getSalesList(): Observable<any> {
      return this._http.get('http://localhost:3000/sales');
    }

    updateSales(id: number, data: any): Observable<any> {
      return this._http.put(`http://localhost:3000/sales/${id}`, data);
    }

    deleteSale(id: number): Observable<any> {
      return this._http.delete(`http://localhost:3000/sales/${id}`);
    }
  
}
