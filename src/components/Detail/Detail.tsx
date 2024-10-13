import { Pokemon } from '../../helpers'
import './Detail.css'



export const Detail: React.FC<Pokemon> = ({ id, img, name, types, abilities }) => {
    return (
        <>
            <div className="first-data">
                <h1>{name}</h1>
                <h3>[# {id}]</h3>
            </div>
            <div className="image-detail">
                <img src={img} alt={name} />
            </div>
            <div className="abilities-detail">
                <p>Habilidades:</p>
                {abilities.map((ability, index) => (
                    <span key={index} className="pokemon-ability">{ability}</span>
                ))}
            </div>
            <div className="data-detail">
                <p>Tipo:</p>
                {types.map((type, index) => (
                    <span key={index} className="pokemon-type">{type}</span>
                ))}
            </div>
        </>
    )
}
