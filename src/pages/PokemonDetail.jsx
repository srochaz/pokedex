import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderPokeballs from "../layouts/HeaderPokeballs";
import { bgByType } from "../constants/pokemon";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);

  const firstType = pokemon?.types[0].type.name

  const { pokemonId } = useParams();

  const getPercentStat = (statValue) => {
    const MAX_STAT_VALUE = 255;
    const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1);
    return `${percentStat}%`;
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="text-center capitalize">
      <HeaderPokeballs />
      <article className={`max-w-[500px] py-10 px-2 mx-auto $`}>
        <header className={`${bgByType[firstType]}`}>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </header>
        <h3>#{pokemon?.id}</h3>
        <h2>{pokemon?.name}</h2>
        <section>
          <h3 className="text-start">Stats</h3>
          <ul className="grid gap-4">
            {pokemon?.stats.map((stat) => (
              <li className="captilaize" key={stat.stat.name}>
                <div className="flex justify-between item-center">
                  <h5>{stat.stat.name}</h5>
                  <span>{stat.base_stat}/255</span>
                </div>

                <div className="bg-slate-200 rounded-md h-6 overflow-hidden">
                  <div
                    style={{ width: getPercentStat(stat.base_stat) }}
                    className={"bg-gradient-to-r from-yellow-300 to-yellow-500 h-full"}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
};

export default PokemonDetail;
