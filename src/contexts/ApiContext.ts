import { createContext, ReactNode, Dispatch } from 'react';
import { Designer, Collection, Item, Order } from '../components/types';

export interface ApiContextType {
  designers: Designer[];
  collections: Collection[];
  items: Item[];
  orders: Order[];
  loading: boolean;
  error: string | null;
  addDesigner: (designer: Designer) => void;
  addCollection: (collection: Collection) => void;
  addItem: (item: Item) => void;
  addOrder: (order: Order) => void;
  removeDesigner: (designerId: string) => void;
  removeCollection: (collectionId: string) => void;
  dispatch: Dispatch<any>;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export interface ApiProviderProps {
  children: ReactNode;
}
