import { useState } from "react";
import './SearchBar.css'

interface SearchBarProps {
    onSearch: (name: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [namePokemon, setNamePokemon] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setNamePokemon(newValue);
        onSearch(newValue);
    };

    const handleClick = () => {
        setNamePokemon("");
        onSearch("");
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Buscador"
                value={namePokemon}
                onChange={handleChange}
            />
            <button onClick={handleClick}>Reset</button>
        </div>
    );
};
