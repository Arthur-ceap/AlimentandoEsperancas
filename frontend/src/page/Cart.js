import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../component/cartProduct';
import carrinhoVazio from '../assest/carrinhoVazio.gif';

const Cart = () => {
  const [purchaseCode, setPurchaseCode] = useState(null); // Estado para o código de compra
  const productCartItem = useSelector((state) => state.product.cartItem);

  const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0);
  const totalQtde = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0);

  // Função para gerar o código de compra
  const generatePurchaseCode = () => {
    const code = Math.floor(10000 + Math.random() * 90000); // Gera um número aleatório de 5 dígitos
    setPurchaseCode(code); // Define o código gerado no estado
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Itens do seu Carrinho
        </h2>

        {productCartItem[0] ? (
          <div className="my-4 flex flex-col lg:flex-row gap-3">
            <div className="w-full lg:w-2/3">
              {productCartItem.map((el) => (
                <CartProduct
                  key={el._id} 
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              ))}
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-blue-500 text-white p-2 text-lg text-center rounded-md shadow-md mt-6">
                Resumo da Compra
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Quantidade:</p>
                <p className="ml-auto w-32 font-bold">{totalQtde}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total a Pagar:</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">R$</span>
                  {totalPrice}
                </p>
              </div>
              <button
                onClick={generatePurchaseCode}
                className="bg-red-500 w-full text-lg font-bold py-2 text-white rounded-md mt-4 shadow-md"
              >
                Gerar Código de Compra
              </button>
              {purchaseCode && ( // Exibir o código apenas se ele for gerado
                <div className="text-center mt-4 text-lg font-bold text-green-500">
                  Código da Compra: {purchaseCode}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center items-center flex-col text-center">
            <img
              src={carrinhoVazio}
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md"
              alt="Carrinho Vazio"
            />
            <p className="text-slate-500 text-xl sm:text-3xl font-bold mt-4">
              Carrinho Vazio
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
