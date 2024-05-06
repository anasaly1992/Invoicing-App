import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InvoicesService } from '../../services/invoices.services';
import { Router } from '@angular/router';
import { Details, Invoice } from '../../models/invoices';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.scss'
})
export class InvoicesListComponent {
  invoicesList!:Invoice[];
  role!:string | null;

  constructor(public inovicesService: InvoicesService,private router: Router) {}


  ngOnInit() {

  //  check user role
   this.role = sessionStorage.getItem('role');
   this.inovicesService.role.subscribe(res => {
    this.role = res
   })


    let items: string = '';
    let totalPrice: number = 0;
    let ionvoicesListLength = this.inovicesService.invoicesList.length;
    let selectedInvoiceIndex = this.inovicesService.selectedInvoiceIndex;

    // loop on invoices list to sum the total price for each invoice and also sum items for each invoice in one row

      this.inovicesService.invoicesList[selectedInvoiceIndex ? +selectedInvoiceIndex: ionvoicesListLength - 1 ]?.details.map((item:Details, index:number) => {
        items = items.concat(index > 0 ? ',' + item.item : '' + item.item);
        totalPrice += item.price;
        this.inovicesService.invoicesList[selectedInvoiceIndex ? +selectedInvoiceIndex : ionvoicesListLength - 1].items = items;
        this.inovicesService.invoicesList[selectedInvoiceIndex ? +selectedInvoiceIndex : ionvoicesListLength - 1].totalPrice = totalPrice.toString();
      })
    this.invoicesList = this.inovicesService.invoicesList;
  }

  

  editInvoice(index:number){
    this.router.navigate([`/edit-invoice/${index}`])
  }

  deleteInvoice(index:number){
    this.inovicesService.invoicesList.splice(index,1)
  }

  addNewInvoice(){
    this.router.navigate(['/add-invoice'])
  }
}
