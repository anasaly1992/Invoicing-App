export interface Invoice {
    details: Details[];
    invoiceNo?: string;
    items?: string;
    paymentStatus: string;
    paymentTypes: string;
    totalPrice: string;
}

export interface Details {
    item: string;
    qty: string;
    price: number;
    totalPrice?: number;
    paymentStatus?: string;
    paymentType?: string
}

export interface Payments {
    name: string;
    code: string;
}