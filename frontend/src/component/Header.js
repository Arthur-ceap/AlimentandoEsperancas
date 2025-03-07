import React, { useState } from 'react';
import logo from "../assest/logo_1.png";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from "react-hot-toast";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user);
    console.log(userData.email);
    const dispatch = useDispatch();

    const handleShowMenu = () => {
        setShowMenu(prev => !prev);
    };

    const handleLogout = () => {
        dispatch(logoutRedux());
        toast("Logout feito com sucesso!");
    };

    // Garantir que a variável cartItemNumber esteja corretamente sendo monitorada
    const cartItemNumber = useSelector((state) => state.product.cartItem);

    return (
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
            {/* Desktop */}
            <div className='flex items-center h-full justify-between'>
                <Link to={""}>
                    <div className='h-10'>
                        <img src={logo} className='h-full' alt="Logo" />
                    </div>
                </Link>
                <div className='flex items-center gap-4 md:gap-7'>
                    <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>
                        <Link to={""}>Home</Link>
                        <Link to={"menu/670d8ee0b7f633de54a0eef7"}>Menu</Link>
                        <Link to={"about"}>Sobre</Link>
                        <Link to={"contact"}>Contato</Link>
                    </nav>
                    <div className='text-2xl text-slate-600 relative'>
                        <Link to={"cart"}>
                            <FaShoppingCart />
                            <div className='absolute -top-2 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>
                                {Array.isArray(cartItemNumber) ? cartItemNumber.length : cartItemNumber}
                            </div>
                        </Link>
                    </div>
                    <div className='text-slate-600' onClick={handleShowMenu}>
                        <div className='text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md'>
                            {userData.image ? <img src={userData.image} className='h-full w-full' alt="User" /> : <FaUser />}
                        </div>
                        {showMenu && (
                            <div className='absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center'>
                                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer px-2'>Novo Produto</Link>}
                                {userData.image ? (
                                    <p className='cursor-pointer text-white px-2 bg-red-500' onClick={handleLogout}>Logout {userData.firstName}</p>
                                ) : (
                                    <Link to={"login"} className='whitespace-nowrap cursor-pointer px-2'>Login</Link>
                                )}
                                <nav className='text-base md:text-lg flex flex-col md:hidden'>
                                    <Link to={""} className='px-2 py-1'>Home</Link>
                                    <Link to={"menu/670d8ee0b7f633de54a0eef7"} className='px-2 py-1'>Menu</Link>
                                    <Link to={"about"} className='px-2 py-1'>Sobre</Link>
                                    <Link to={"contact"} className='px-2 py-1'>Contato</Link>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile */}
        </header>
    );
};

export default Header;
