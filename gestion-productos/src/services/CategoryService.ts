import axios from 'axios';

export class CategoryService {
    getCategories() {
        return axios.get('https://api.tu-servidor.com/categories')
            .then(res => res.data)
            .catch(err => console.error('Error fetching categories:', err));
    }

    addCategory(category: any) {
        return axios.post('https://api.tu-servidor.com/categories', category)
            .then(res => res.data)
            .catch(err => console.error('Error adding category:', err));
    }

    updateCategory(category: any) {
        return axios.put(`https://api.tu-servidor.com/categories/${category.id}`, category)
            .then(res => res.data)
            .catch(err => console.error('Error updating category:', err));
    }

    deleteCategory(id: string) {
        return axios.delete(`https://api.tu-servidor.com/categories/${id}`)
            .then(res => res.data)
            .catch(err => console.error('Error deleting category:', err));
    }
}
