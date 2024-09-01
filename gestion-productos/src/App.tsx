// src/App.tsx
import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import Categories from './components/Categories';
import Products from './components/Products';
import './App.css';

const App: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        { label: 'Categorías', icon: 'pi pi-fw pi-list' },
        { label: 'Productos', icon: 'pi pi-fw pi-tags' },
    ];

    return (
        <div className="container">
            <div className="header">
                Gestión de Proyectos
            </div>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            <div className="main-content">
                {activeIndex === 0 && <Categories />}
                {activeIndex === 1 && <Products />}
            </div>
            <div className="footer">
                © 2024 Proyecto de Gestión
            </div>
        </div>
    );
}

export default App;
