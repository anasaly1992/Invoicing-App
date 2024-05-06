import { Routes } from '@angular/router';
import { InvoicesListComponent } from './invoices/components/invoices-list/invoices-list.component';
import { AddInvoiceComponent } from './invoices/components/add-invoice/add-invoice.component';


export const routes: Routes = [
    {
        component: InvoicesListComponent,
        path: ''
    },
    {
        component: AddInvoiceComponent,
        path: 'add-invoice'  
    },
    {
        component: AddInvoiceComponent,
        path: 'edit-invoice/:id'  
    }
];
