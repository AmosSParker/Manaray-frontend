import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AgentsComponent implements OnInit {
  agents: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchAgents();
  }

  fetchAgents() {
    this.http.get<any[]>(`${environment.apiUrl}/api/agents`)
      .subscribe(
        data => {
          console.log('Agents data received:', data);
          this.agents = data;
        },
        error => {
          console.error('Error fetching agents:', error);
        }
      );
  }

  editAgent(agent: any) {
    // Implement edit logic here
    console.log('Editing agent:', agent);
  }

  deleteAgent(agentId: number) {
    this.http.delete(`${environment.apiUrl}/api/agents/${agentId}`)
      .subscribe(
        () => {
          console.log('Agent deleted:', agentId);
          this.agents = this.agents.filter(agent => agent.ID !== agentId);
        },
        error => {
          console.error('Error deleting agent:', error);
        }
      );
  }
}




