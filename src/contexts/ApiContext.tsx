// src/contexts/ApiContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import { Collection, Designer, Item, Order } from '../components/types';


export interface ApiContextType {
  designers: Designer[];
  collections: Collection[];
  items: Item[];
  orders: Order[];
  loading: boolean;
  error: string | null;
}
interface ApiProviderProps {
  children: ReactNode;
} 

export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [designersRes, collectionsRes, itemsRes, ordersRes] = await Promise.all([
          axios.get(`${API_URL}/designers`),
          axios.get(`${API_URL}/collections`),
          axios.get(`${API_URL}/items`),
          axios.get(`${API_URL}/orders`),
        ]);

        setDesigners(designersRes.data);
        setCollections(collectionsRes.data);
        setItems(itemsRes.data);
        setOrders(ordersRes.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ApiContext.Provider value={{ designers, collections, items, orders, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};
