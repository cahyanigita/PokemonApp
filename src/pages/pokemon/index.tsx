import React, { useEffect, useState } from "react";

interface CaughtPokemon {
  name: string;
  nickname: string;
  image: string;
}

const Pokemon: React.FC = () => {
  const [caughtPokemons, setCaughtPokemons] = useState<CaughtPokemon[]>([]);

  useEffect(() => {
    const storedPokemons = JSON.parse(
      localStorage.getItem("caughtPokemons") || "[]"
    );
    console.log("Stored Pokémon data:", storedPokemons);
    setCaughtPokemons(storedPokemons);
  }, []);

  const handleDelete = (pokemonName: string) => {
    const caughtPokemons = JSON.parse(
      localStorage.getItem("caughtPokemons") || "[]"
    );
    const updatedPokemons = caughtPokemons.filter(
      (p: any) => p.name !== pokemonName
    );
    localStorage.setItem("caughtPokemons", JSON.stringify(updatedPokemons));

    setCaughtPokemons(updatedPokemons);
  };

  return (
    <div className="mx-auto p-7 min-h-screen bg-amber-900">
      <h1 className="text-2xl font-bold mb-4">My Caught Pokemons</h1>
      {caughtPokemons.length === 0 ? (
        <p className="font-mono">You haven't caught any Pokemon yet.</p>
      ) : (
        <ul className="space-y-4 bg-yellow-100">
          {caughtPokemons.map((pokemon) => (
            <li
              key={pokemon.name}
              className="flex items-center space-x-4 p-4 border rounded"
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-16 h-16"
              />
              <span className="font-mono">
                {pokemon.nickname} ({pokemon.name})
              </span>
              <button
                onClick={() => handleDelete(pokemon.name)}
                className="ml-auto px-4 py-2 bg-red-600 text-white rounded font-mono"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pokemon;
