export interface IconData {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: BadgeStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}

export interface InvoiceState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  filteredInvoices: Invoice[];
  showAddInvoiceForm: boolean;
}

export type BadgeStatus = 'paid' | 'pending' | 'draft';

export type Headline = 'h1' | 'h2' | 'h3' | undefined;

export type TextVariant = 'p' | 'span' | 'label';

export type FieldProps = {
  type: string;
  name: string;
  id: string;
  class:string
};

export type ButtonType =
  | 'btn_one'
  | 'btn_two'
  | 'btn_three'
  | 'btn_four'
  | 'btn_five'
  | 'btn_six';
