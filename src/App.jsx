import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Order from './components/Order';

const App = () => {
  return (
    <div >
       <Navbar/>
       <Hero/>
       <Menu/>
       <About/>
       <Testimonials/>
       <Contact/>
       <Order />
       <Footer/>
    </div>
  )
}

export default App
