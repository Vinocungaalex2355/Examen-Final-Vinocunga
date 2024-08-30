import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import axios from 'axios';

interface Category {
    id: number;
    name: string;
}

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<Category>({ id: 0, name: '' });
    const [categoryDialog, setCategoryDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const openNew = () => {
        setCategory({ id: 0, name: '' });
        setSubmitted(false);
        setCategoryDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCategoryDialog(false);
    };

    const saveCategory = () => {
        setSubmitted(true);

        if (category.name.trim()) {
            let _categories = [...categories];
            if (category.id) {
                const index = _categories.findIndex(cat => cat.id === category.id);
                _categories[index] = category;
            } else {
                category.id = createId();
                _categories.push(category);
            }
            setCategories(_categories);
            setCategoryDialog(false);
            setCategory({ id: 0, name: '' });
        }
    };

    const editCategory = (category: Category) => {
        setCategory({ ...category });
        setCategoryDialog(true);
    };

    const deleteCategory = (category: Category) => {
        setCategories(categories.filter(cat => cat.id !== category.id));
    };

    const createId = () => {
        return Math.floor(Math.random() * 1000);
    };

    return (
        <div>
            <div className="card">
                <Button label="Nueva categoria" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <DataTable value={categories}>
                    <Column field="name" header="Nombre" sortable></Column>
                    <Column body={(rowData) => (
                        <>
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editCategory(rowData)} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteCategory(rowData)} />
                        </>
                    )}></Column>
                </DataTable>
            </div>

            <Dialog visible={categoryDialog} style={{ width: '450px' }} header="Detalle de la categoria " modal className="p-fluid" onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nombre categoria</label>
                    <InputText id="name" value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} required autoFocus />
                </div>
                <div className="p-dialog-footer">
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                    <Button label="guardar" icon="pi pi-check" className="p-button-text" onClick={saveCategory} />
                </div>
            </Dialog>
        </div>
    );
}

export default Categories;
