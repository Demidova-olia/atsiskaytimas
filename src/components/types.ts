export interface Contact {
  email: string;
  phone: string;
  website: string;
}

export interface Designer {
  id: string;
  name: string;
  bio: string;
  country: string;
  contact: Contact;
  image: string;
  collections?: Collection[]; 
}

export interface Collection {
  collectionId: string;
  designerId: string;
  name: string;
  season: string;
  year: number;
  items?: Item[];
}

export interface Item {
  itemId: string;
  collectionId: string;
  name: string;
  type: string;
  material: string;
  price: number;
  currency: string;
  color: string;

  description: string;
  image: string;
}

export interface Order {
  orderId: string;
  customerName: string;
  itemId: string; 
  quantity: number;
  totalPrice: number;
  currency: string;
  status: string;
  orderDate: string;
  shippingAddress: string;
}

export interface Data {
  designers: Designer[];
  collections: Collection[];
  items: Item[];
  orders: Order[];
}

export type ItemFormProps = {
  editItemData?: Partial<Item> | null; 
};

export type DesignerFormProps = {
  editDesignerData?: Partial<Designer> | null; 
};

export type OrderFormProps = {
  editOrderData?: Partial<Order> | null;  
};
