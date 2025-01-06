import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from "react-redux";
import CardFeature from '../component/CardFeature';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { CiForkAndKnife } from "react-icons/ci";
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartlist = Array.isArray(productData) ? productData.slice(1,5) : [];
  const homeProductCartlistVegetables = productData.filter(el => el.category === "Vegetais",[])

  const loadingArray = new  Array(4).fill(null)
  const loadingArrayFeature = new  Array(10).fill(null)

  const slideProductRef = useRef()


  const nextProduct  = ()=>{
    slideProductRef.current.scrollLeft += 200
  }
  const preveProduct = ()=>{
    slideProductRef.current.scrollLeft -= 200
  }

  

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2 '>
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Entrega de Bicicleta</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' className='h-7 ' alt="Ícone de bicicleta" />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>O Preço mais Barato na <span className='text-red-600'>Sua Casa</span></h2>
          <p className='py-3 text-base text-justify'>
              No Alimentando Esperanças, acreditamos que cada gesto pode gerar um grande impacto. Nosso e-commerce é mais do que uma plataforma de compras — 
              é um projeto social que conecta pequenos comércios locais a pessoas que buscam economia e qualidade. 
              Oferecemos uma seleção de alimentos próximos à data de validade com preços extremamente acessíveis, permitindo que você economize enquanto 
              contribui para o fortalecimento da economia local e o desenvolvimento de comunidades periféricas.
              Ao escolher comprar conosco, você não está apenas adquirindo produtos, 
              mas participando de uma rede que promove inclusão social e apoia comerciantes locais a 
              expandirem seus negócios e aumentarem sua clientela. Navegue, explore e descubra como suas 
              compras podem ajudar a combater o desperdício, apoiar empreendedores e proporcionar alimentos 
              a quem mais precisa. Com o Alimentando Esperanças, cada clique é um passo em direção a um futuro mais sustentável e solidário. 
              Faça parte dessa transformação e sinta a diferença que sua participação pode fazer!
          </p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Peça Agora</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {homeProductCartlist[0] ? homeProductCartlist.map((el) => {
            return(
              <HomeCard
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
              />
            )
          })
          : 
          loadingArray.map((el, index) =>{
            return(
              <HomeCard
                key={index+"Carregando..."}
                loading={"Carregando..."}
              />
            )
          })
        }
        </div>
      </div>

      <div className=''>
          <div className='flex w-full items-center'>
            <h2 className='font-bold text-2xl text-slate-800 mb-4'>Vegetais Frescos</h2>
            <div className='ml-auto flex gap-4'>
              <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
              <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>
            </div>
          </div>
          <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
            {
              homeProductCartlistVegetables[0] ? homeProductCartlistVegetables.map(el =>{
                return(
                  <CardFeature
                    key={el._id+"Vegetais"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                )
              })
              : 
              loadingArrayFeature.map((el,index) => <CardFeature loading="Carregando..." key={index+"cartLoading"}/>)
            }
          </div>
      </div>

      <AllProduct heading={"Seu Produto"}/>
    

    </div>
  );
}

export default Home;