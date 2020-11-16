import React, { useState , useEffect } from 'react'
import { useSpring, animated } from 'react-spring';
import { render } from 'react-dom'
import axios from 'axios'
import Quote from './Quote'
import './index.css'

export default function App(){

  const [stateAuthor , setStateAuthor] = useState(false)
  const [author , setAuthor] = useState(null)
  const [quotes, setQuotes] = useState([])
  const [genre, setGenre] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [roll, setRoll] = useState(false)

  useEffect(() => {
    getQuotes()
  }, [])

  const {opacity, top , absolute, transform, subTop} = useSpring({
    opacity: isLoading ? 0.5 : 1,
    top: stateAuthor ? '120px' : '0px',
    absolute: stateAuthor ? 'absolute' : '',
    transform: `rotate(${roll ? 360 : 0}deg)`
  })

  async function getQuotes(){
    try {
      setLoading(true)
      setStateAuthor(false)
      const quotes = await axios.get('https://quote-garden.herokuapp.com/api/v2/quotes/random').then(res => {
        setQuotes([res.data.quote])
        setAuthor(res.data.quote.quoteAuthor)
        setGenre(res.data.quote.quoteGenre)
        setLoading(false)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function getAuthor(author){
    try {
      setStateAuthor(true)
      setLoading(true)
      const quotes = await axios.get(`https://quote-garden.herokuapp.com/api/v2/authors/${author}?page=1&limit=10`).then(res => {
        console.log(res)
        setGenre('quotes')
        setQuotes(res.data.quotes)
        setLoading(false)
      })
    } catch (error) {
      
    }
  }

  return (
    <>
    <div className="random-btn" onClick={() => getQuotes()}>Random
    <animated.i class="fas fa-redo-alt" onMouseEnter={() => setRoll(true)} onMouseLeave={() => setRoll(false)} style={{ transform: transform}} ></animated.i>
    </div>
      <div className="container">
        <animated.div className="quotes" style={{ top: top, position: absolute}}>
          {quotes.map((item , i) => {
            return (
              <Quote text={item} isLoading={isLoading}/>
            )
          })}
        </animated.div>
        <animated.div className="info" onClick={() => getAuthor(author)} style={{opacity: opacity, position: absolute}}>
          <div className="author" >{author}</div>
          <div className="genre">{genre}</div>
        </animated.div>
      </div>
    </>
  )
}

render(<App />, document.getElementById('root'))
