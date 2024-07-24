import PokemonCard from "../../components/pokemon-card";
import { UsePokemonList } from "./hooks/pokemonList";
import { getPokemonByName } from "../../services/pokemon/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";

const Home = () => {
  const navigate = useNavigate();
  const { loading, pokemonData } = UsePokemonList();

  const query = useQuery();

  const offset = (
    query.get("offset") !== null ? query.get("offset") : 1
  ) as string;

  const extractId = (url: string) => {
    const segments = url.split("/");
    return segments[segments.length - 2];
  };

  const handleNextPage = () => {
    const numOffset = Number(offset);
    navigate(`?offset=${numOffset + 20}`);
  };

  const handleBackPage = () => {
    const numOffset = Number(offset);
    if (numOffset > 1) {
      navigate(`?offset=${numOffset - 20}`);
    }
  };

  const handlePokemonClick = async (name: string) => {
    try {
      const response = await getPokemonByName(name.toString());
      response;
      navigate(`/pokemon/${name}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col py-5 min-h-screen bg-amber-900">
      {!loading ? (
        <div className="flex flex-row px-5 py-5 gap-3 flex-wrap justify-center text-center">
          {pokemonData?.results.map((item: any) => (
            <PokemonCard
              key={item.name}
              id={extractId(item.url)}
              name={item.name}
              onClick={() => handlePokemonClick(item.name)}
            />
          ))}
        </div>
      ) : (
        <div className="font-mono font-bold">Loading..</div>
      )}
      <div className="flex flex-row justify-center gap-3 p-8">
        <button
          onClick={handleBackPage}
          className="font-semibold font-mono p-3 bg-amber-50"
          disabled={Number(offset) <= 1}
        >
          Back
        </button>
        <button onClick={handleNextPage} className="font-bold font-mono p-3 bg-amber-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
