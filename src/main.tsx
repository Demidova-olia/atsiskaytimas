import './index.css'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import OrdersPage from './pages/OrdersPage.tsx'
import DesignersPage from './pages/designers/DesignersPage.tsx'
import CollectionsPage from './pages/CollectionsPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    {/* <ProjectNavigation/> */}
      <Routes>
        
        <Route path="/" element={<App/>} />
        

        <Route path="orders">
          <Route index element={<OrdersPage />} />
          {/* <Route path=":id" element={<OrderPage />} />
          <Route path="create" element={<CreateOrder />} />
          <Route path="edit/:id" element={<EditOrder />} /> */}
        </Route>

        <Route path="designers">
          <Route index element={<DesignersPage />} />
          {/* <Route path=":id" element={<DesignerPage />} />
          <Route path="create" element={<CreateDesigner />} />
          <Route path="edit/:id" element={<EditDesigner />} /> */}
        </Route>

        <Route path="collections">
        <Route index element={<CollectionsPage />} />
        {/* <Route path=":id" element={<CollectionPage />} />
        <Route path="create" element={<CreateCollection />} />
        <Route path="edit/:id" element={<EditCollection />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
