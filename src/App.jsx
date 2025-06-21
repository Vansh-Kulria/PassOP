import React from 'react'
import './App.css'
import Navbar from './Componants/Navbar'
import Manager from './Componants/Manager'

function App() {
  return (
    <div>
              <div className="relative h-screen w-full  bg-slate-950 overflow-auto">
            {/* Background grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
            
            {/* Content */}
     <Navbar />
     <Manager />
        </div>
    </div>
  )

}

export default App
