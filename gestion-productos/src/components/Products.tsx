import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    category: Category;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product>({ id: 0, name: '', category: { id: 0, name: '' } });
    const [productDialog, setProductDialog] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));

        axios.get('/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const openNew = () => {
        setProduct({ id: 0, name: '', category: { id: 0, name: '' } });
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            if (product.id) {
                const index = _products.findIndex(prod => prod.id === product.id);
                _products[index] = product;
            } else {
                product.id = createId();
                _products.push(product);
            }
            setProducts(_products);
            setProductDialog(false);
            setProduct({ id: 0, name: '', category: { id: 0, name: '' } });
        }
    };

    const editProduct = (product: Product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const deleteProduct = (product: Product) => {
        setProducts(products.filter(prod => prod.id !== product.id));
    };

    const createId = () => {
        return Math.floor(Math.random() * 1000);
    };

    return (
        <div>
            <div className="card">
                <Button label="Nuevo producto" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <DataTable value={products}>
                    <Column field="name" header="Nombre" sortable></Column>
                    <Column field="category.name" header="Categoria" sortable></Column>
                    <Column body={(rowData) => (
                        <>
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteProduct(rowData)} />
                        </>
                    )}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Detalle de la categoria " modal className="p-fluid" onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nombre categoria</label>
                    <InputText id="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required autoFocus />
                </div>
                <div className="field">
                    <label htmlFor="category">Categoria</label>
                    <Dropdown id="category" value={product.category} options={categories} onChange={(e) => setProduct({ ...product, category: e.value })} optionLabel="name" placeholder="Select a Category" />
                </div>
                <div className="p-dialog-footer">
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                    <Button label="guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
                </div>
            </Dialog>
        </div>
    );
}

export default Products;
