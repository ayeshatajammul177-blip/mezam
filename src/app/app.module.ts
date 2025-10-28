import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import {FormpageComponent } from './pages/formpage/formpage.component';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { SharedModule } from './shared/shared.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ApplicationsComponent } from './admin/applications/applications.component';
import { UsersComponent } from './admin/users/users.component';
import { MyApplicationsComponent } from './pages/my-applications/my-applications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormpageComponent,
    SignupComponent,
    ChatbotComponent,
    AdminDashboardComponent,
    MainLayoutComponent,
    ApplicationsComponent,
    UsersComponent,
    MyApplicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
