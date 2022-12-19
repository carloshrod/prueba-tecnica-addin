import { useProductsContext } from '../context/ProductsContext';
import Loader from './Loader';
import Modal from './Modal';
import ProductCard from './ProductCard';

function ProductsGrid() {
    const { products, setShow, isLoading } = useProductsContext();

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
                <>
                    {isLoading
                        ? <Loader />
                        :
                        <div className="noData">
                            <span>Please start to add products!</span>
                        </div >
                    }
                </>
            }
            <Modal />
        </>
    )
}

export default ProductsGrid;