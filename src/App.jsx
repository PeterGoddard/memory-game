import { useEffect, useState } from 'react'
import './App.css'

const RandomImageButtons = () => {
  const [pngs, setPNGs] = useState([])
  const [count, setCounter] = useState(0)
  const [highscore, setHighscore] = useState(0)
  const [count_list, setCountList] = useState([])
  var pokemon = ['ditto','pikachu','bulbasaur','charizard','squirtle','weedle','rattata','eevee']
  

  const randomize = (name) => {
    
    console.log(name)
    console.log(count_list)
    console.log("randomize!")

    var array = structuredClone(pngs)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    if (count_list.includes(name)){

      if (highscore < count){
        setHighscore(count)
      }

      setCountList([])
      setCounter(0)

    } else {
      var templ = structuredClone(count_list)
      templ.push(name)
      setCountList(templ)
      setCounter(count + 1)
    }

    setPNGs(array)

  };
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const responses = await Promise.all(pokemon.map(p => fetch('https://pokeapi.co/api/v2/pokemon/'+p)))
        const data = await Promise.all(responses.map(response => response.json()))
        setPNGs(data);
        console.log(data)
      } catch (error){
        console.log(error)
      }
    };

    fetchData();
    
  
  }, []);
  return (
    <div> 
      <div id="cards">
        {pngs.map((png) => (
            <button className="card" key={png.species.name}>
              <img key={png.species.name} src={png.sprites.front_default} onClick={() => randomize(png.species.name)} className="base" width="170" height="179" alt="" />
            </button>
            
          ))}
      </div>
      <div key="3" className="counter">
          Score: {count}
      </div>
      <div key="4" className="counter">
          High Score: {highscore}
      </div>
    </div>

  );

};


function App() {
  
  return (
    <>
      <section id="center">
        <div className="hero">
          <RandomImageButtons />
        </div>
      </section>
    </>
  )
}

export default App
