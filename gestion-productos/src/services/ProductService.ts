import axios from 'axios';

export class ProductService {
    getProducts() {
        return axios.get('https://api.tu-servidor.com/products')
            .then(res => res.data)
            .catch(err => console.error('Error fetching products:', err));
    }

    addProduct(product: any) {
        return axios.post('https://api.tu-servidor.com/products', product)
            .then(res => res.data)
            .catch(err => console.error('Error adding product:', err));
    }

    updateProduct(product: any) {
        return axios.put(`https://api.tu-servidor.com/products/${product.id}`, product)
            .then(res => res.data)
            .catch(err => console.error('Error updating product:', err));
    }

    deleteProduct(id: string) {
        return axios.delete(`https://api.tu-servidor.com/products/${id}`)
            .then(res => res.data)
            .catch(err => console.error('Error deleting product:', err));
    }
}
