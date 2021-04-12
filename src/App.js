import React, {useState, useEffect} from "react";
import PokemonList from './PokemonList'
import axios from 'axios'
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentURL, setCurrentURL] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios.get(currentURL, {cancelToken: new axios.CancelToken(c => cancel = c)}).then(res => {
      setPokemon(res.data.results.map(item => item.name));
      setNextURL(res.data.next);
      setPrevURL(res.data.previous);
      setLoading(false);
    });

    return () => {
      cancel();
    }
  }, [currentURL]);

  if(loading) return "Loading...";

  function gotoNextPage(){
    setCurrentURL(nextURL);
  }

  function gotoPrevPage(){
    setCurrentURL(prevURL);
  }

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage = {nextURL ? gotoNextPage : null}
        gotoPrevPage = {prevURL ? gotoPrevPage: null}
      />
    </>
  );
}

export default App;
