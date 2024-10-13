// Interfaces
export interface Pokemon {
    id: number;
    name: string;
    img: string;
    types: string[];
    abilities: string[];
}
export interface PokemonResult {
    name: string;
    url: string;
}
export interface CardProps {
    id: number;
    img: string;
    name: string;
    onClick: () => void;
}
export interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
}

// Default
export const defaultPokemon: Pokemon = {
    id: 0,
    name: "",
    img: "https://i.ytimg.com/vi/pVs9pdFgSVU/maxresdefault.jpg", 
    types: [""],
    abilities: [''],
};

// Function
export const countPokemonsByLetter = (pokemons: Pokemon[]): { [key: string]: number } => {
    return pokemons.reduce((counts, pokemon) => {
        const firstLetter = pokemon.name.charAt(0).toUpperCase();
        counts[firstLetter] = (counts[firstLetter] || 0) + 1;
        return counts;
    }, {} as { [key: string]: number });
};

