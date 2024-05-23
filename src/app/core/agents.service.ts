import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  private apiUrl = `${environment.apiUrl}/api/agents`;

  constructor(private http: HttpClient) { }

  getAgents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAgent(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAgent(agent: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, agent);
  }

  updateAgent(id: string, agent: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, agent);
  }

  deleteAgent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

