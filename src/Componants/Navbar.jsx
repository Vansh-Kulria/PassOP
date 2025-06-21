import React from 'react'

const Navbar = () => {
    return (
        <nav className="relative top-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-4xl px-6 py-3 bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/40 flex items-center justify-between">
            <a
                href="#"
                className="flex items-center transition-transform duration-200 hover:scale-105"
                title="Go to Home"
            >
                {/* Animated lock icon */}
                <span className="inline-block animate-bounce group-hover:animate-spin text-green-400 drop-shadow-lg mr-2">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                        <rect x="5" y="11" width="14" height="8" rx="2" fill="#22c55e" />
                        <rect x="8" y="7" width="8" height="6" rx="4" fill="#fbbf24" />
                        <circle cx="12" cy="15" r="1.5" fill="#fff" />
                        <rect x="10.5" y="15.5" width="3" height="4" rx="1.5" fill="#22c55e" opacity="0.7" />
                    </svg>
                </span>
                <span className="text-2xl font-black text-green-400 drop-shadow-lg transition-colors duration-200 group-hover:text-green-300 tracking-tight">
                    Pass
                </span>
                <span className="text-2xl font-black text-amber-300 drop-shadow-lg transition-colors duration-200 group-hover:text-yellow-400 tracking-tight">
                    OP
                </span>
            </a>
            <ul className="flex sm:gap-4 md:gap-8">

                <li className="relative group">
                    <div className='flex items-center justify-center relative px-3 py-1 rounded-lg font-medium text-base transition-all duration-200 gap-2 hover:bg-gray-700/60 hover:text-green-300  text-gray-400 group'>
                    <div>
                    <lord-icon
                        src="https://cdn.lordicon.com/jjxzcivr.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#16c72e">

                    </lord-icon>

                    </div>
                    <a
                        href="https://github.com/Vansh-Kulria/PassOP"
                        target='_blank'
                    >
                        GitHUB
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-4/5 h-0.5 bg-gradient-to-r from-green-400 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                    </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar