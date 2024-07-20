import { useEffect, useState } from 'react';
import { getAllPokemon } from './utils/pokemondata';
import { getRecode } from './utils/pokemondata';
import Card from './components/Card/Card';
import './App.css';
import Navbar from './components/Navbar/Navbar';

const sleep = delay => new Promise(resolve => setTimeout(resolve , delay));

function App() {

  // エンドポイント設定
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";
  const [isLoading , setLoading ] = useState(true);
  const [pokemonData , setPokemonData] = useState([]);
  const [nextUrl , setNextUrl ] = useState("");
  const [preUrl , setPreUrl] = useState("");
  //引数を空の配列にすることによって実行するトリガーとなる変数がないので初回のみ描画
  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      await sleep(2000);
      let res = await getAllPokemon(initialUrl);
      // 詳細なポケモンデータを取得する
      setNextUrl(res.next);
      setPreUrl(res.previous);
      loadPokemon(res.results);
      setLoading(false);
      // console.log(res)
    }
    fetchPokemonData();
  } , []);
  const loadPokemon = async (data) => {
    let pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getRecode(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(pokemonData);
  };

  // console.log(pokemonData);

  const handlePre = async () => {
    if(!preUrl) return;
    setLoading(true);
    await sleep(1000);
    let data = await getAllPokemon(preUrl);
    await loadPokemon(data.results);
    setLoading(false);
    setPreUrl(data.previous);
    setNextUrl(data.next);
  };
  const handleNe = async () => {
    setLoading(true);
    await sleep(1000);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setLoading(false);
    setPreUrl(data.previous);
    setNextUrl(data.next);
  };


  return(
    <>
    <Navbar/>
    <div className="App">
    {isLoading ? (
      <h1>ロード中...</h1>
    ) : (
      <>
        <div className='pokemonContainer'>
          {pokemonData.map((pokemon , i) => {
            return <Card key={i} pokemon={pokemon}/>;
          })}
        </div>
        <div className='btn'>
          <button onClick={handlePre}>前へ</button>
          <button onClick={handleNe}>次へ</button>
        </div>
      </>
    )}
  </div>
  </>
  );
};

export default App;
