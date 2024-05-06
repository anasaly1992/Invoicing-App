import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Invoice } from "../models/invoices";

@Injectable({
    providedIn: 'root'
  })

  export class InvoicesService {

    invoicesList: Invoice[] = [];
    selectedInvoiceIndex!: number | null;
    role = new Subject<string | null>();
  }