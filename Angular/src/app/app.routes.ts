import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/services/auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',

    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'feed',
        component: FeedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: PagenotfoundComponent,
    },

];
