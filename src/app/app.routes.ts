import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "",
        component: BlankComponent,
        canActivate: [authGuard],
        children: [
            {
                path: "home",
                loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
                title: "FreshCart | Home"
            },
            {
                path: "brands",
                loadComponent: () => import('./pages/brands/brands.component').then((c) => c.BrandsComponent),
                title: "FreshCart | Brands"
            },
            {
                path: "categories",
                loadComponent: () => import('./pages/categories/categories.component').then((c) => c.CategoriesComponent),
                title: "FreshCart | Categories"
            },
            {
                path: "products",
                loadComponent: () => import('./pages/products/products.component').then((c) => c.ProductsComponent),
                title: "FreshCart | Products"
            },
            {
                path: "details/:id",
                loadComponent: () => import('./pages/details/details.component').then((c) => c.DetailsComponent),
                title: "FreshCart | Details"
            },
            {
                path: "cart",
                loadComponent: () => import('./pages/cart/cart.component').then((c) => c.CartComponent),
                title: "FreshCart | Cart"
            },
            {
                path: "checkout",
                loadComponent: () => import('./pages/checkout/checkout.component').then((c) => c.CheckoutComponent),
                title: "FreshCart | Payment"
            },
            {
                path: "allorders",
                loadComponent: () => import('./pages/allorders/allorders.component').then((c) => c.AllordersComponent),
                title: "FreshCart | Orders"
            },
            {
                path: "wishlist",
                loadComponent: () => import('./pages/wishlist/wishlist.component').then((c) => c.WishlistComponent),
                title: "FreshCart | Wishlist"
            }
        ]
    },
    {
        path: "",
        component: AuthComponent,
        canActivate: [loggedGuard],
        children: [
            {
                path: "register",
                loadComponent: () => import('./pages/register/register.component').then((c) => c.RegisterComponent),
                title: "FreshCart | Register"
            },
            {
                path: "login",
                loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
                title: "FreshCart | Login"
            }
        ]
    },
    {
        path: "**",
        loadComponent: () => import('./pages/notfound/notfound.component').then((c) => c.NotfoundComponent),
        title: "Error Not Found"
    }
];
