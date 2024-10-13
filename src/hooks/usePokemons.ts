import { useState, useRef } from "react";
import { Pokemon, PokemonResult } from "../helpers";

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';


export const usePokemons = (itemsPerPage: number = 20) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const cache = useRef<{ [page: number]: Pokemon[] }>({});


    const getPokemons = async (page: number = 1) => {
        setIsLoading(true);

        if (cache.current[page]) {
            setPokemons(cache.current[page]);
            setIsLoading(false);
            return;
        }

        try {
            const offset = (page - 1) * itemsPerPage;
            const url = `${URL_BASE}?offset=${offset}&limit=${itemsPerPage}`;

            const response = await fetch(url);
            const dataApi = await response.json();
            const { results }: { results: PokemonResult[] } = dataApi;

            const infoPokemons = await Promise.all(
                results.map(async (pokemon: PokemonResult): Promise<Pokemon> => {
                    const response = await fetch(pokemon.url);
                    const poke = await response.json();
                    return {
                        id: poke.id || 0,
                        name: poke.name || 'Unknown',
                        img: poke.sprites?.other?.dream_world?.front_default || 'default_image_url',
                        types: poke.types?.map((typeObj: { type: { name: string } }) => typeObj.type.name) || [],
                        abilities: poke.abilities?.map((abilityObj: { ability: { name: string } }) => abilityObj.ability.name) || []
                    };
                })
            );

            setAllPokemons((prev) => [...prev, ...infoPokemons]);
            cache.current[page] = infoPokemons;

            setPokemons(infoPokemons);
            setCurrentPage(page);
            setIsLoading(false);
        } catch (error) {
            console.log('Error en la petición', error);
            setIsLoading(false);
        }
    };

    return { pokemons, allPokemons, getPokemons, setPokemons, isLoading, currentPage };
};
