import { useProductsContext } from '../context/ProductsContext';
import Modal from './Modal';
import ProductCard from './ProductCard';

function ProductsGrid() {
    const { products, setShow } = useProductsContext();

    const showModal = () => setShow(true);

    return (
        <>
            <div className="addButtonContainer">
                <button onClick={showModal}>Add product</button>
            </div>
            {products.length > 0
                ?
                <ul className="productsGrid">
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </ul>
                :
                <div className="noData">
                    <span>No data. Please start to add products!</span>
                </div>
            }
            <Modal />
        </>
    )
}

export default ProductsGrid;