import { useState, useEffect } from 'react';
import { Summary, Detail, Pagination, Card, SearchBar, usePokemons } from '../index';
import { countPokemonsByLetter, defaultPokemon, Pokemon } from '../helpers/index';
import './Home.css'

export const Home = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const itemsPerPage = 12;
    const { pokemons, allPokemons, setPokemons, getPokemons, isLoading } = usePokemons(itemsPerPage);


    useEffect(() => {
        getPokemons(currentPage);
    }, [currentPage, getPokemons]);


    const handleSearch = (name: string) => {
        const lowerCaseName = name.toLowerCase();
        setSearchTerm(lowerCaseName);

        if (lowerCaseName) {
            const filteredPokemons = allPokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(lowerCaseName)
            );
            setPokemons(filteredPokemons);
        } else {
            getPokemons(currentPage)
        }        
    };

    const filteredPokemons = searchTerm
        ? pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm))
        : pokemons;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        if (!searchTerm) {
            getPokemons(newPage);
        }
    };
    const handleCardClick = (pokemon: Pokemon) => setSelectedPokemon(pokemon);
    const pokemonsByLetter = countPokemonsByLetter(allPokemons);


    return (
        <>
            <SearchBar 
                onSearch={handleSearch} 
            />
            <section className="container">

                <div className="container-list">
                    {isLoading ? (
                        <div className="loading">
                            <p>Cargando...</p>
                        </div>
                    ) : (
                        <div id="list">
                            {filteredPokemons.map((p, index) => (
                                <Card
                                    key={`${p.id}-${index}`}
                                    id={p.id}
                                    name={p.name}
                                    img={p.img}
                                    onClick={() => handleCardClick(p)}
                                />
                            ))}
                        </div>
                    )}
                    {!searchTerm && ( 
                        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
                    )}
                </div>

                <div id="detail">
                    {selectedPokemon ? (
                        <Detail
                            id={selectedPokemon.id}
                            name={selectedPokemon.name}
                            img={selectedPokemon.img}
                            types={selectedPokemon.types}
                            abilities={selectedPokemon.abilities}
                        />
                    ) : (
                        <Detail
                            id={defaultPokemon.id}
                            name={defaultPokemon.name}
                            img={defaultPokemon.img}
                            types={defaultPokemon.types}
                            abilities={defaultPokemon.abilities}
                        />
                    )}
                </div>
            </section>

            <section id="count">
                <Summary pokemonsByLetter={pokemonsByLetter} />
            </section>
        </>
    );
};
