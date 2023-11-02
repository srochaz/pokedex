import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../components/pokedex/PokemonList";
import HeaderPokeballs from "../layouts/HeaderPokeballs";
import { paginateData } from "../utils/pagination";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const { itemsInCurrentPages, lastPage, PagesInCurrentBlock } = paginateData(
    pokemonsByName,
    currentPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const handlePreviousPage = () => {
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >= 1 ) {
      setCurrentPage(newCurrentPage)
    }
    
  }

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1 
    if(newCurrentPage <= lastPage) setCurrentPage(newCurrentPage)
    
  }

  useEffect(() => {
    if (currentType === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}`)
        .then(({ data }) => {
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon));
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    setCurrentPage(1)
  },[currentType])

  return (
    <main>
      <HeaderPokeballs />
      <section className="grid justify-items-center font-bold p-2" >
        <p>
        Welcome <span className="text-red-600 font-bold"> {trainerName}, </span>
          here you can find your favorite pokemon
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input className="border-solid border-2 border-black p-1" name="pokemonName" type="text" />
            <button className="border-solid border-2 border-red-700 bg-red-500 text-white p-1">Search</button>
          </div>
          <select onChange={handleChangeType} className="capitalize">
            <option value="">All pokemons</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
        </form>
      </section>

      <ul className="flex justify-center gap-4 flex-wrap">
              {currentPage !== 1 && (
                  <li>
                  <button onClick={handlePreviousPage}> {"<"} </button>
                </li>
              )}
        {PagesInCurrentBlock.map((page) => (
          <li key={page}>
            <button 
            onClick={() => setCurrentPage(page)}
            className={`p-2 text-white font-bold rounded-md ${currentPage === page ? "bg-red-500" : "bg-red-400" }`}>{page} </button>
          </li>
        ))}
        {
          currentPage !== lastPage && <li>
          <button 
          onClick={handleNextPage}
          >{">"} </button>
        </li>
        }
      </ul>

      <PokemonList pokemons={itemsInCurrentPages} />
    </main>
  );
};

export default Pokedex;
