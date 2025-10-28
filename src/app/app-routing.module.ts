import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { FormpageComponent } from './pages/formpage/formpage.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { AuthGuard } from './auth-guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ApplicationsComponent } from './admin/applications/applications.component';
import { UsersComponent } from './admin/users/users.component';
import { MyApplicationsComponent } from './pages/my-applications/my-applications.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: '',
    component: MainLayoutComponent, // 👈 layout for normal users
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'formpage', component: FormpageComponent, canActivate: [AuthGuard] },
      { path: 'chatbot', component: ChatbotComponent, canActivate: [AuthGuard] },
      { path: 'my-applications', component: MyApplicationsComponent, canActivate: [AuthGuard] }
    ]
  },

  // Admin route completely separate — no header/footer here
  { path: 'admin-dashboard', component: AdminDashboardComponent ,canActivate: [AuthGuard]},
  { path: 'admin/applications', component: ApplicationsComponent ,canActivate: [AuthGuard]},
  { path: 'admin/users', component: UsersComponent ,canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }