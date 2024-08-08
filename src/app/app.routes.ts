import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SalesListComponent } from './pages/sales-list/sales-list.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: '', redirectTo:'login' , pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'sales-list',
        component:SalesListComponent,
        canActivate: [AuthGuardService]
    }
];

