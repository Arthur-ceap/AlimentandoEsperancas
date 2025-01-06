import React, { useState } from 'react'
import { BsCloudUpload } from "react-icons/bs";
import { ImagemtoBase64 } from '../utility/ImagetoBase64';
import toast from 'react-hot-toast';

const NewProduct = () => {
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  })

  const handleOnChange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const uploadImage = async(e)=>{
    const data = await ImagemtoBase64(e.target.files[0])
    //console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
    })
  }


  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price} = data

    if(name && image && category && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchRes = await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })
    }
    else{
      toast("Os campos estão vazios, preencha-os")
    }


  }
  return (
    <div className="p-4">
       <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Nome</label>
        <input type={"text"}  name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category'>Categoria</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"Outros"}>Selecione a Categoria</option>
          <option value={"Frutas"}>Frutas</option>
          <option value={"Vegetais"}>Vegetais</option>
          <option value={"Sorvete"}>Sorvete</option>
          <option value={"Dosa"}>Dosa</option>
          <option value={"Pizza"}>Pizza</option>
          <option value={"Arroz"}>Arroz</option>
          <option value={"Bolo"}>Bolos</option>
          <option value={"Hambúrguer"}>Hambúrguer</option>
          <option value={"Panelas"}>Panelas</option>
          <option value={"Sanduíche"}>Sanduíche</option>
        </select>

        <label htmlFor='image'>Imagem
        <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            { 
              data.image ? <img src={data.image} className="h-full" /> :<span className='text-5xl'><BsCloudUpload/></span> 
            }
            
            
           <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden"/>
        </div>
        </label>
        

        <label htmlFor='price' className='my-1'>Preço</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description'>Descrição</label>
        <textarea rows={2} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Salvar</button>
       </form>
    </div>
  )
}

export default NewProduct