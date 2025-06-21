import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    // Use state for passwords
    const [passwords, setPasswords] = useState([]);
    const [showPassword, setshowPassword] = useState(false);
    const [formData, setFormData] = useState({
        website_url: "",
        username: "",
        password: "",
        id: uuid()
    });
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    


    const getPasswords = async () => {
        let reqestPass = await fetch("http://localhost:3000/")
        let passes = await reqestPass.json()
        if (passes) {
            setPasswords(passes);
        } else {
            setPasswords([]);
        }
    }

    useEffect(() => {
        getPasswords();
    }, []);

    const savePassword = async () => {
        if (formData.website_url && formData.username && formData.password) {
            const newPassword = { ...formData, id: uuid() };
            const updated = [...passwords, newPassword];
            setPasswords(updated);
            // localStorage.setItem("passwords", JSON.stringify(updated));
            let request = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPassword)
            })
            if (!request.ok) {
                toast.error('Failed to save password!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }

            setFormData({ website_url: "", username: "", password: "", id: uuid() });
            toast('Password saved successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Please fill all fields!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletePassword = async (item) => {
        // Confirmation before deletion
        if (!window.confirm("Are you sure you want to delete this password?")) {
            return;
        }
        // Remove the password from the state
        const updatedPasswords = passwords.filter((password) => password.id !== item.id);
        setPasswords(updatedPasswords);
        // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        let request = await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: item.id })
        })
        toast.success('Password deleted successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const editPassword =async (item) => {
        setFormData({ website_url: item.website_url, username: item.username, password: item.password, id: item.id })
        const updatedPasswords = passwords.filter((password) => password.id !== item.id);
        setPasswords(updatedPasswords);

         let request = await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: item.id })
        })


        
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />


            <div className="text-center mt-10 mb-4">

                <span className="text-4xl font-black text-green-400 drop-shadow-lg transition-colors duration-200 group-hover:text-green-300 tracking-tight">
                    Pass
                </span>
                <span className="text-4xl font-black text-amber-300 drop-shadow-lg transition-colors duration-200 group-hover:text-yellow-400 tracking-tight">
                    OP
                </span>
            </div>

            <p className='text-2xl text-green-300 font-semibold text-center mt-4'>
                Your own personal manager for your passwords.
            </p>

            <div className="relative top-4 mt-10 mb-10 left-1/2 -translate-x-1/2  w-[95vw] max-w-4xl p-5 pt-8 bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/40 flex flex-col justify-center items-center">
                <input type="text" value={formData.website_url} onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none hover:bg-gray-800/70 focus:ring-2 focus:ring-green-400 w-full" placeholder="Enter website URL" />

                <div className='w-full flex gap-6 items-center '>
                    <input type="text"
                        value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="mb-4 px-4 py-2 rounded-full  bg-gray-800 text-white focus:outline-none hover:bg-gray-800/70 focus:ring-2 focus:ring-green-400 w-full" placeholder="Enter Username" />

                    <div className={"flex  mb-4 bg-gray-800 text-white focus:outline-none hover:bg-gray-800/70 rounded-full  items-center justify-between gap-2 " + (isPasswordFocused ? 'ring-2 ring-green-400' : '')} > 

                        <input className="min-w-2/5 pl-4 py-2 text-white focus:outline-none rounded-l-full" 
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            placeholder="Enter Password" />

                        <div className="pr-2 pt-1" onClick={() => setshowPassword(!showPassword)}>
                            {showPassword ?
                                <lord-icon className='w-6 '
                                    src="https://cdn.lordicon.com/dicvhxpz.json"
                                    trigger="hover"
                                    colors="primary:#ffffff,secondary:#16c72e">
                                </lord-icon>
                                :
                                <lord-icon className='w-6 '
                                    src="https://cdn.lordicon.com/dicvhxpz.json"
                                    trigger="hover"
                                    state="hover-cross"
                                    colors="primary:#ffffff,secondary:#16c72e"></lord-icon>}

                        </div>
                    </div>

                </div>
                
                <button onClick={savePassword} className='group px-3 gap-2 py-1 mt-4 flex items-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 w-fit'>
                    <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#ffffff"
                    >
                    </lord-icon>
                    <p>Add Password</p>
                </button>


            </div>
            <div className="relative mb-5 left-1/2 -translate-x-1/2  w-[95vw] max-w-4xl p-5 pt-8 bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/40 flex flex-col justify-center items-center">
                <h2 className='text-2xl text-green-300 font-semibold mb-4'>Saved Passwords</h2>

                {passwords.length === 0 ? (
                    <p className='text-gray-400 text-lg '>No passwords saved yet. Start adding your passwords!</p>
                ) :
                    <div className='w-full text-white'>
                        <table className='w-full text-left'>
                            <thead>
                                <tr className='border-b border-gray-700 bg-gray-800/80 '>
                                    <th className='px-4 py-2'>#</th>
                                    <th className='px-4 py-2'>Website</th>
                                    <th className='px-4 py-2'>Username</th>
                                    <th className='px-4 py-2'>Password</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords.map((item, index) => (
                                    <tr key={item.id || index} className='border-b border-gray-700 hover:bg-gray-900/60 transition-colors duration-200'>
                                        <td className="px-4 py-2">{index + 1} </td>
                                        <td className='px-4 py-2'> <a href={`${item.website_url}`}>{item.website_url}</a></td>
                                        <td className='px-4 py-2'>{item.username}</td>
                                        <td className='px-4 py-2'>{item.password}</td>
                                        <td>
                                            <div className="flex gap-2 items-center ">

                                                <button onClick={() => deletePassword(item)} >
                                                    <lord-icon className='w-6'
                                                        src="https://cdn.lordicon.com/jzinekkv.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff,secondary:#16c72e">
                                                    </lord-icon></button>
                                                <button onClick={() => editPassword(item)} >
                                                    <lord-icon className='w-6'
                                                        src="https://cdn.lordicon.com/exymduqj.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff,secondary:#16c72e"
                                                    ></lord-icon></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
            </div >
        </>
    )
}

export default Manager