import React, { useEffect, useState } from 'react';
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import { useSelector } from 'react-redux';

const AllProduct = ({ heading, loading }) => {
    const productData = useSelector((state) => state.product.productList);

    // Criação da lista de categorias sem valores indefinidos
    const categoryList = [...new Set(productData.map(el => el.category).filter(category => category))];

    // Estado para filtrar os dados
    const [filterby, setfilterby] = useState();
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        setDataFilter(productData);
    }, [productData]);

    const handleFilterProduct = (category) => {
        setfilterby(category);
        if (category) {
            const filter = productData.filter(el => el.category && el.category.toLowerCase() === category.toLowerCase());
            setDataFilter(filter);
        }
    };

    const loadingArrayFeature = new Array(10).fill(null);

    return (
        <div>
            <div className='my-5'>
                <h2 className='font-bold text-2xl text-slate-800 mb-4'>{heading}</h2>

                <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
                    {
                        categoryList.length > 0 ? categoryList.map(el => (
                            <FilterProduct
                                category={el}
                                key={el}
                                isActive={filterby && el.toLowerCase() === filterby.toLowerCase()}
                                onClick={() => handleFilterProduct(el)}
                            />
                        )) : (
                            <div className='min-h-[150px] flex justify-center items-center'>
                                <p>Carregando...</p>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className='flex flex-wrap justify-center gap-4 my-4'>
                {
                    dataFilter.length > 0 ? dataFilter.map(el => (
                        <CardFeature
                            key={el._id}
                            id={el._id}
                            image={el.image}
                            name={el.name}
                            category={el.category}
                            price={el.price}
                        />
                    )) : (
                        loadingArrayFeature.map((_, index) => <CardFeature loading="Carregando..." key={index + "allProduct"} />)
                    )
                }
            </div>
        </div>
    );
}

export default AllProduct;
