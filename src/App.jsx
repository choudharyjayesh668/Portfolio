import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CustomCursor from '@/components/shared/CustomCursor'
import NoiseCanvas from '@/components/shared/NoiseCanvas'
import EasterEgg from '@/components/shared/EasterEgg'
import Home from '@/pages/Home'
import CertificatePage from '@/pages/CertificatePage'

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#090909] text-[#F5F5F5]">
        <CustomCursor />
        <NoiseCanvas />
        <EasterEgg />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificate/:id" element={<CertificatePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}
