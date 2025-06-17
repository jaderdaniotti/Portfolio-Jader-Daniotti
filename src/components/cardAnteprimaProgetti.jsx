function CardAnteprimaProgetti({ title, description, imageUrl, link, linkProgetto }) {
    return (
    <div className="card  lg:card-side bg-chiaro shadow-sm">
        <figure>
            <img
                src={imageUrl}
                alt="" className="object-contain"/>
        </figure>
        <div className="card-body text-scuro ">
            <h2 className="card-title text-scuro">{title}</h2>
            <p>{description}</p>
            <a href={link}>Vedi il progetto.</a>
        </div>
    </div>

    )
}
export default CardAnteprimaProgetti;