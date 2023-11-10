import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';
import { async } from '@firebase/util';
import { withOptions } from 'tailwindcss/plugin';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12)
    const { totalProducts } = useLoaderData();

    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pageNumbers = [...Array(totalPages).keys()]
    console.log(pageNumbers);

    useEffect(() => {
        fetch(`http://localhost:3000/products?page=${currentPage}&limit=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage,itemsPerPage])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // cart.push(product); '
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const options = [12, 24, 36, 48, 60, 76];
    const handleSelectChange = (e) => {
        setItemsPerPage(parseInt(e.target.value))
        setCurrentPage(0)
    }

    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to="/orders">
                            <button className='btn-proceed px-3'>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
            <div className="pagination text-center">
                {
                    pageNumbers.map(page => <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? 'active' : ""}
                    >{page}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange} className='border-solid'>
                    {
                        options.map(option =>
                            <option key={option} value={option}>
                                {option}
                            </option>
                        )
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;