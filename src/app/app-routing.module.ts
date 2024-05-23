import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { AgentsComponent } from './agents/agents.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { CommandsComponent } from './commands/commands.component';
import { LogsComponent } from './logs/logs.component';
// import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent /*, canActivate: [AuthGuard] */ },
  { path: 'tasks', component: TasksComponent /*, canActivate: [AuthGuard] */ },
  { path: 'agents', component: AgentsComponent /*, canActivate: [AuthGuard] */ },
  { path: 'compliance', component: ComplianceComponent /*, canActivate: [AuthGuard] */ },
  { path: 'scenarios', component: ScenariosComponent /*, canActivate: [AuthGuard] */ },
  { path: 'commands', component: CommandsComponent /*, canActivate: [AuthGuard] */ },
  { path: 'logs', component: LogsComponent /*, canActivate: [AuthGuard] */ },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('AppRoutingModule initialized');
  }
}
