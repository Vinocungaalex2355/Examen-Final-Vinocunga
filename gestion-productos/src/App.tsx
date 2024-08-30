import React, { useState } from 'react';
import Categories from './components/Categories';
import Products from './components/Products';
import { TabMenu } from 'primereact/tabmenu';

const App: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        { label: 'Categorias', icon: 'pi pi-fw pi-list' },
        { label: 'Productos', icon: 'pi pi-fw pi-tags' },
    ];

    return (
        <div className="App">
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            {activeIndex === 0 && <Categories />}
            {activeIndex === 1 && <Products />}
        </div>
    );
}

export default App;
