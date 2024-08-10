import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private _http:HttpClient) {}

    addSales(data: any): Observable<any> {
      return this._http.post('http://localhost:8080/api/v1/sale', data);
    }

    getSalesList(): Observable<any> {
      return this._http.get('http://localhost:8080/api/v1/sale');
    }

    updateSales(id: number, data: any): Observable<any> {
      console.log(data);
      return this._http.put(`http://localhost:8080/api/v1/sale/${id}`, data);
    }

    deleteSale(id: number): Observable<any> {
      return this._http.delete(`http://localhost:8080/api/v1/sale/${id}`);
    }
  
}
