import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import axios from 'axios'
import Cancion from "./components/Cancion";
import Info from "./components/Info";
function App() {

  const [busquedaletra, setBusquedaletra] = useState({})
  const [letra, setLetra] = useState('')
  const [info, setInfo] = useState('')
  useEffect(()=> {
      if(Object.keys(busquedaletra).length === 0)return


      const consultarApiLetra = async () => {
        const {artista, cancion} = busquedaletra
        const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
        const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`

        const[letra, informacion] = await Promise.all([
          axios(url),
          axios(url2) 
        ])
        
        setLetra(letra.data.lyrics)
        setInfo(informacion.data.artists[0])
      }
      consultarApiLetra()
  },[busquedaletra, info])
  return (
    <Fragment>
      <Formulario setBusquedaletra={setBusquedaletra}/>

      <div className="container mt-5">
        <div className="row">
          <div className="colmd-6">
            <Info info={info}/>
          </div>
          <div className="colmd-6">
              <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
