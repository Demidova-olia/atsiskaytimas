import { Designer, Collection, Item, Order } from '../components/types';

type Action =
  | { type: 'ADD_DESIGNER'; payload: Designer }
  | { type: 'UPDATE_DESIGNER'; payload: Designer }
  | { type: 'REMOVE_DESIGNER'; payload: string }  // payload: id дизайнера
  | { type: 'ADD_COLLECTION'; payload: Collection }
  | { type: 'UPDATE_COLLECTION'; payload: Collection }
  | { type: 'REMOVE_COLLECTION'; payload: string }  // payload: id коллекции
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'UPDATE_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; payload: string }  // payload: id элемента
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_DESIGNERS'; payload: Designer[] }
  | { type: 'SET_COLLECTIONS'; payload: Collection[] }
  | { type: 'SET_ITEMS'; payload: Item[] }
  | { type: 'SET_ORDERS'; payload: Order[] };

interface State {
  designers: Designer[];
  collections: Collection[];
  items: Item[];
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export const apiReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_DESIGNER':
      return { ...state, designers: [...state.designers, action.payload] };
    case 'UPDATE_DESIGNER':
      return { 
        ...state, 
        designers: state.designers.map(designer => 
          designer.id === action.payload.id ? action.payload : designer
        ) 
      };
    case 'REMOVE_DESIGNER':
      return { 
        ...state, 
        designers: state.designers.filter(designer => designer.id !== action.payload) 
      };
    case 'ADD_COLLECTION':
      return { ...state, collections: [...state.collections, action.payload] };
    case 'UPDATE_COLLECTION':
      return { 
        ...state, 
        collections: state.collections.map(collection => 
          collection.collectionId === action.payload.collectionId ? action.payload : collection
        ) 
      };
    case 'REMOVE_COLLECTION':
      return { 
        ...state, 
        collections: state.collections.filter(collection => collection.collectionId !== action.payload) 
      };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return { 
        ...state, 
        items: state.items.map(item => 
          item.itemId === action.payload.itemId ? action.payload : item
        ) 
      };
    case 'REMOVE_ITEM':
      return { 
        ...state, 
        items: state.items.filter(item => item.itemId !== action.payload) 
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DESIGNERS':
      return { ...state, designers: action.payload };
    case 'SET_COLLECTIONS':
      return { ...state, collections: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};

