import './Summary.css'

interface SummaryProps {
    pokemonsByLetter: { [key: string]: number }; 
}

export const Summary: React.FC<SummaryProps> = ({ pokemonsByLetter }) => {
    const sortedLetters = Object.keys(pokemonsByLetter).sort();

    return (
        <>
            <h2>Pokémons por letra</h2>
            <table>
                <tbody>
                    <tr className="letter">
                        {sortedLetters.map((letter) => (
                            <td key={letter}>{letter}</td>
                        ))}
                    </tr>
                    <tr className='number'>
                        {sortedLetters.map((letter) => (
                            <td key={letter}>{pokemonsByLetter[letter]}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    );
};

