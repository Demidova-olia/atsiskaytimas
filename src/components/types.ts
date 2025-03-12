export interface Contact {
  email: string;
  phone: string;
  website: string;
}

export interface Designer {
  designer_id: string;
  name: string;
  bio: string;
  country: string;
  collections: Collection[];
  contact: Contact;
  image: string;
}

export interface Collection {
  collection_id: string;
  designer_id: string;
  name: string;
  season: string;
  year: number;
  items: Item[];
}

export interface Item {
  item_id: string;
  collection_id: string;
  name: string;
  type: string;
  material: string;
  price: number;
  currency: string;
  color: string;
  sizes_available: string[];
  description: string;
  orders: Order[];
  image: string;
}

export interface Order {
  order_id: string;
  customer_name: string;
  item_id: string;
  quantity: number;
  total_price: number;
  currency: string;
  status: string;
  order_date: string;
  shipping_address: string;
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
