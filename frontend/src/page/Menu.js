import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItem } from '../redux/productSlide'

const Menu = () => {
  const { filterby } = useParams()
  const dispatch = useDispatch()
  const productData = useSelector(state => state.product.productList)

  // Verificar se o produto foi encontrado
  const productDisplay = productData.filter(el => el._id === filterby)[0]
  console.log(productDisplay)

  const handleAddCartProduct = (e)=>{
    e.stopPropagation()
    dispatch(addCartItem(productDisplay))
  }

  // Renderizar apenas se productDisplay estiver definido
  return (
    <div className='p-2 md:p-4'>
      {productDisplay ? (
        <div className='w-full max-w-4xl m-auto flex items-center md:flex bg-white'>
          <div className='max-w-lg shadow overflow-hidden w-full p-5'>
            <img src={productDisplay.image} alt={productDisplay.name || 'Product'} className='hover:scale-105 transition-all h-full' />
          </div>
          <div className='flex flex-col gap-1'>
              <h3 className='font-semibold text-slate-600 capitalize text-2xl md:text-4xl'>{productDisplay.name}</h3>
              <p className=' text-slate-500 font-medium text-2xl'>{productDisplay.category}</p>
              <p className=' font-bold md:text-2xl'><span className='text-red-500'>R$</span><span>{productDisplay.price}</span></p>
              <div className='flex gap-3'>
                  {/*<button className='bg-yellow-500 mt-2 rounded hover:bg-yellow-600 px-5 py-2 min-w-[100px]'>Comprar</button>*/}
                  <button onClick={handleAddCartProduct} className='bg-yellow-500 mt-2 rounded hover:bg-yellow-600 px-5 py-2 min-w-[100px]'>Adicionar ao Carrinho</button>
              </div>
              <div className=''>
                <p className='text-slate-600 font-medium'>Fornecedor: </p>
                <p>{productDisplay.description}</p>
              </div>
          </div>
        </div>
      ) : (
        <p className='text-center text-red-500'>Produto não encontrado.</p>
      )}
      <AllProduct heading={"Produtos Relacionados"}/>
    </div>
  )
}

export default Menu
