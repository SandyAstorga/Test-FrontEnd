import { CardProps } from '../../helpers'
import './Card.css'


export const Card: React.FC<CardProps> = ({ id, img, name, onClick }) => {

    return (
        <div key={id} className="container-card" onClick={onClick}>
            <img className="image-card" src={img} alt={name} />
            <div className="data-card">
                <h1>{name}</h1>
            </div>
        </div>
    )
}
