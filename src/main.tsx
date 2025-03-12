import './index.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import OrdersPage from './pages/orders/OrdersPage.tsx';
import DesignersPage from './pages/designers/DesignersPage.tsx';
import { ApiProvider } from './contexts/ApiContext';
import ItemsPage from './pages/collectionsAndItems/itemsPage.tsx';
import ItemPage from './pages/collectionsAndItems/ItemPage.tsx';
import CollectionsAndItemsPage from './pages/collectionsAndItems/CollectionsAndItemsPage.tsx';
import OrderPage from './pages/orders/OrderPage.tsx';
import DesignerPage from './pages/designers/DesignerPage.tsx';
import CollectionPage from './pages/collectionsAndItems/CollectionPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="orders">
            <Route index element={<OrdersPage />} />
            <Route path=":orderId" element={<OrderPage />} />
            {/* <Route path="create" element={<CreateOrder />} />
            <Route path="edit/:id" element={<EditOrder />} /> */}
          </Route>

          <Route path="designers">
            <Route index element={<DesignersPage />} />
            <Route path=":designerId" element={<DesignerPage />} />
            {/* <Route path="create" element={<CreateDesigner />} />
            <Route path="edit/:id" element={<EditDesigner />} /> */}
          </Route>

          <Route path="collections">
            <Route index element={<CollectionsAndItemsPage />} />
            <Route path=":collectionId/items" element={<ItemsPage />} />
            {/* <Route path=":itemId" element={<ItemPage />} /> */}
            <Route path=":collectionId" element={<CollectionPage />} />
            {/* <Route path="create" element={<CreateCollection />} />
            <Route path="edit/:id" element={<EditCollection />} /> */}
          </Route>

          <Route path="items">
            <Route index element={<ItemsPage />} />
            <Route path=":itemId" element={<ItemPage />} /> {/* Теперь работает! */}
          </Route>
          {/* <Route path=":collectionId/items">
            <Route index element={<ItemsPage />} /> */}
            {/* <Route path=":itemId" element={<ItemsPage />} />
            <Route path="create" element={<CreateItem />} />
            <Route path="edit/:id" element={<EditItem />} /> */}
          {/* </Route> */}

        </Routes>
      </ApiProvider>
    </BrowserRouter>
  </StrictMode>
);
