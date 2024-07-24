interface Props {
  id: string;
  name: string;
  onClick: (id: string) => void;
}

const PokemonCard = (props: Props) => {
  const { id, name, onClick } = props;
  const imgPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  return (
    <div className = "border p-3 rounded-lg flex flex-col items-center cursor-pointer bg-gray-50"
    onClick={() => onClick(id)}>
      <img src={imgPokemon} alt={name} className="w-40 h-40" />
      <label className="font-serif font-bold">{name}</label>
    </div>
  );
};

export default PokemonCard;
