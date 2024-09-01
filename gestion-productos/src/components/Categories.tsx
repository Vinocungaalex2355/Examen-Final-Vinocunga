import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import '../App.css';

interface Category {
    id: number;
    name: string;
}

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: 'Tecnología' },
        { id: 2, name: 'Ciencia' },
        { id: 3, name: 'Matemáticas' },
        { id: 4, name: 'Literatura' },
        { id: 5, name: 'Arte' },
    ]);
    const [category, setCategory] = useState<Category>({ id: 0, name: '' });
    const [categoryDialog, setCategoryDialog] = useState(false);
    const [, setSubmitted] = useState(false);

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
        <div className="categories-container">
            <div className="header">
                <h2>Gestión de Categorías</h2>
            </div>
            <div className="main-content">
                <div className="data-table">
                    <Button label="Nueva Categoría" icon="pi pi-plus" className="p-button-success" onClick={openNew} />
                    <DataTable value={categories}>
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column body={(rowData) => (
                            <div className="actions">
                                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editCategory(rowData)} />
                                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteCategory(rowData)} />
                            </div>
                        )}></Column>
                    </DataTable>
                </div>
                <div className="buttons">
                    <Button label="Crear" className="p-button-success" onClick={openNew} />
                    <Button label="Leer" className="p-button-info" onClick={() => console.log("Leer")} />
                    <Button label="Actualizar" className="p-button-warning" onClick={saveCategory} />
                    <Button label="Borrar" className="p-button-danger" onClick={() => deleteCategory(category)} />
                </div>
            </div>

            <Dialog visible={categoryDialog} style={{ width: '450px' }} header="Detalles de la Categoría" modal className="p-fluid" onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nombre de la Categoría</label>
                    <InputText id="name" value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} required autoFocus />
                </div>
                <div className="p-dialog-footer">
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                    <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveCategory} />
                </div>
            </Dialog>
        </div>
    );
}

export default Categories;
