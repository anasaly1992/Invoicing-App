import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvoicesService } from '../../services/invoices.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Details, Payments } from '../../models/invoices';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss'
})
export class AddInvoiceComponent implements OnInit {
  constructor(private builder: FormBuilder, private inovicesService: InvoicesService, private route: ActivatedRoute, private router: Router) {

  }
  invoicedetail !: FormArray<any>;
  invoiceItems: Details[] = [];
  paymentStatus!: Payments[];
  paymentTypes!: Payments[];
  id!: number;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // check the status if the component in editing mode it would set value in the form
    if (this.id) {
      this.inovicesService.selectedInvoiceIndex = this.id;
      this.setFormValue();
    }

    // check the status if the component in adding mode it would add one empty row
    this.id ? null : this.addNewRow();

    this.paymentStatus = [
      { name: 'Paid', code: 'paid' },
      { name: 'Pending', code: 'pending' },
    ]
    this.paymentTypes = [
      { name: 'Cash', code: 'Cash' },
      { name: 'Check', code: 'Check' },
    ]
  }

  setFormValue() {
    for (let i = 0; i < this.inovicesService.invoicesList[this.id].details.length; i++) {
      this.addNewRow();
    };
    this.invoiceform.setValue({
      details: this.inovicesService.invoicesList[this.id].details,
      totalPrice: this.inovicesService.invoicesList[this.id].totalPrice,
      invoiceNo: '1',
      paymentStatus: this.inovicesService.invoicesList[this.id].paymentStatus,
      paymentTypes: this.inovicesService.invoicesList[this.id].paymentTypes
    })
  }
  
  Removeproduct(index: number) {
    this.invproducts.removeAt(index);
  }

  invoiceform: any = this.builder.group({
    details: this.builder.array([]),
    totalPrice: this.builder.control(''),
    invoiceNo: this.builder.control(''),
    paymentStatus: this.builder.control('', Validators.required),
    paymentTypes: this.builder.control('')
  });

  addNewRow() {
    this.invoicedetail = this.invoiceform.get("details") as FormArray;
    this.invoicedetail.push(this.Generaterow());
  }

  get invproducts() {
    return this.invoiceform.get("details") as FormArray;
  }

  createInvoice() {
    if (this.id) {
      this.inovicesService.invoicesList.splice(this.id, 1, this.invoiceform.value);
    } else {
      this.inovicesService.selectedInvoiceIndex = null;
      this.inovicesService.invoicesList.push(this.invoiceform.value)
    }
    this.router.navigate([''])
  }

  Generaterow() {
    return this.builder.group({
      item: this.builder.control(''),
      qty: this.builder.control('', Validators.required),
      price: this.builder.control(''),
    });
  }

}
