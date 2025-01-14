import { useEffect, useState } from 'react';

//icones
import { FaHeart, FaThumbsUp } from 'react-icons/fa'; // Ícones do React Icons

// components
import Footer from './components/Footer'
import Navbar from './components/Navbar'

// swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


function App() {

  const [choice, setChoice] = useState<'cat' | 'dog' | null>(null)
  const [dataDog, setDataDog] = useState<string[]>([])
  const [dataCat, setDataCat] = useState<{ url: string }[]>([])
  const [votes, setVotes] = useState<{ [key: string]: { heart: number; thumbsUp: number } }>({}) //contador de votos

  const api_dog_url = import.meta.env.VITE_API_DOG_URL
  const api_cat_url = import.meta.env.VITE_API_CAT_URL

  useEffect(() => {
    const getDataDog = async () => {
      try {
        const response = await fetch(api_dog_url)
        const data = await response.json()
        setDataDog(data.message)
      } catch (error) {
        console.log(error)
      }
    }
    if (choice === 'dog') {
      getDataDog()
    }
  }, [choice, api_dog_url])

  useEffect(() => {
    const getDataCat = async () => {
      try {
        const response = await fetch(api_cat_url)
        const data = await response.json()
        console.log(data)
        setDataCat(data.map((item: { url: string }) => ({ url: item.url })))
      } catch (error) {
        console.log(error)
      }
    }
    if (choice === 'cat') {
      getDataCat()
    }
  }, [choice, api_cat_url])

  // registrando os votos
  const handleVote = (id: string, type: 'heart' | 'thumbsUp') => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [id]: {
        heart: type === 'heart' ? (prevVotes[id]?.heart || 0) + 1 : prevVotes[id]?.heart || 0,
        thumbsUp: type === 'thumbsUp' ? (prevVotes[id]?.thumbsUp || 0) + 1 : prevVotes[id]?.thumbsUp || 0,
      }
    }))
  }

  return (
    <>
      <Navbar resetChoice={() => setChoice(null)} />

      <section className="container">

        {/* escolha entre gato e cachorro, será exibido somente se não houve escolhas*/}
        {!choice && (
          <>
            <h1>Faça sua escolha</h1>
            <div className="buttons">
              <button onClick={() => setChoice('cat')}>Gato</button>
              <button onClick={() => setChoice('dog')}>Cachorro</button>
            </div>
          </>
        )}


        {/* Mostrar slides após a escolha */}
        {choice && (
          <div>
            {choice === 'dog' && dataDog.length > 0 ? (
              <Swiper
                effect="cards"
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {dataDog.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt={`Dog ${index + 1}`}
                    />
                    <div className='card'>
                      <div className="vote-container">
                        <button onClick={() => handleVote(`dog-${index}`, 'heart')}>
                          <FaHeart color="red" /> {votes[`dog-${index}`]?.heart || 0}
                        </button>
                        <button onClick={() => handleVote(`dog-${index}`, 'thumbsUp')}>
                          <FaThumbsUp color="blue" /> {votes[`dog-${index}`]?.thumbsUp || 0}
                        </button>
                      </div>
                    </div>

                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Swiper
                effect="cards"
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {dataCat.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img.url}
                      alt={`Cat ${index + 1}`}
                    />
                    <div className='card'>
                      <div className="vote-container">
                        <button onClick={() => handleVote(`cat-${index}`, 'heart')}>
                          <FaHeart color="red" /> {votes[`cat-${index}`]?.heart || 0}
                        </button>
                        <button onClick={() => handleVote(`cat-${index}`, 'thumbsUp')}>
                          <FaThumbsUp color="blue" /> {votes[`cat-${index}`]?.thumbsUp || 0}
                        </button>
                      </div>
                    </div>

                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        )}

      </section>



      <Footer />

    </>
  )
}

export default App
