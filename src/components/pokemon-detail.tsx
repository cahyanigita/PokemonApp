import { useEffect, useState } from "react";

import CatchPokemon from "./pokemon-catch";
import { PokemonResponse } from "../services/pokemon/type";
import axios from "axios";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemonDetail, setPokemonDetail] = useState<PokemonResponse | null>(
    null
  );

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => {
      setPokemonDetail(response.data);
    });
  }, [name]);

  if (!pokemonDetail) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-amber-900">
      <h1 className="text-3xl font-bold mb-4">
        {pokemonDetail.name}
      </h1>
      <img
        src={pokemonDetail.sprites.other.dream_world.front_default}
        alt={pokemonDetail.name}
        className="w-40 h-40"
      />
      <div>
        <div className="bg-yellow-50 p-3 rounded-lg ">
          {pokemonDetail.stats.map((stat, index) => (
            <h2 key={index} className="font-mono">
              {stat.stat.name}: {stat.base_stat}
            </h2>
          ))}
        </div>
      </div>
      <CatchPokemon pokemon={pokemonDetail} />
    </div>
  );
};

export default PokemonDetail;
