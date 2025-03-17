import React, { useReducer, useEffect } from 'react';
import { ApiContext, ApiProviderProps } from './ApiContext';
import { apiReducer } from './ApiReducer';
import { Designer, Collection, Item, Order } from '../components/types';
import { API_URL } from '../../config';
import axios from 'axios';

const initialState = {
  designers: [],
  collections: [],
  items: [],
  orders: [],
  loading: true,
  error: null,
};

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const [designersRes, collectionsRes, itemsRes, ordersRes] = await Promise.all([
          axios.get(`${API_URL}/designers`),
          axios.get(`${API_URL}/collections`),
          axios.get(`${API_URL}/items`),
          axios.get(`${API_URL}/orders`),
        ]);

        dispatch({ type: 'SET_DESIGNERS', payload: designersRes.data });
        dispatch({ type: 'SET_COLLECTIONS', payload: collectionsRes.data });
        dispatch({ type: 'SET_ITEMS', payload: itemsRes.data });
        dispatch({ type: 'SET_ORDERS', payload: ordersRes.data });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to load data',
        });
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Define action handlers
  const addDesigner = (designer: Designer) => {
    dispatch({ type: 'ADD_DESIGNER', payload: designer });
  };

  const updateDesigner = (designer: Designer) => {
    dispatch({ type: 'UPDATE_DESIGNER', payload: designer });
  };

  const addCollection = (collection: Collection) => {
    dispatch({ type: 'ADD_COLLECTION', payload: collection });
  };

  const addItem = (item: Item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const addOrder = (order: Order) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const removeDesigner = (designerId: string) => {
    dispatch({ type: 'REMOVE_DESIGNER', payload: designerId });
  };

  const removeCollection = (collectionId: string) => {
    dispatch({ type: 'REMOVE_COLLECTION', payload: collectionId });
  };


  const removeOrder = (orderId: string) => {
    dispatch({ type: 'REMOVE_ORDER', payload: orderId });
  };

  return (
    <ApiContext.Provider
      value={{
        designers: state.designers,
        collections: state.collections,
        items: state.items,
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        addDesigner,
        updateDesigner, 
        addCollection,
        addItem,
        addOrder,
        removeDesigner,
        removeCollection,
        removeOrder,
        dispatch,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
