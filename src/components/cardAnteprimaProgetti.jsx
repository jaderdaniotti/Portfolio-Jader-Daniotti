function CardAnteprimaProgetti({ title, description, imageUrl, link, linkGithub }) {
    return (
        <div className={`group relative overflow-hidden rounded-2xl bg-chiaro shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full card-sfondo-bianco `}>
            {/* Immagine con overlay */}
            <div className="relative object-contain ">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-contain transition-transform duration-700 p-5 position-absolute group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay con link progetto */}
                {linkGithub && (

                    <div className="absolute top-4 left-4 opacity-0 flex gap-1 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 duration-300">
                            <span><i className="bi bi-tv"></i> View </span>
                        </a>
                        <a
                            href={linkGithub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 duration-300"
                        >

                            <span><i className="bi bi-github"></i> Github </span>
                        </a>

                    </div>
                )}
                {/* Overlay con link progetto */}
                {link && (

                    <div className="absolute top-4 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                    </div>
                )}
            </div>
            {/* Contenuto della card */}
            <div className="p-6 flex flex-col justify-between ">
                <div>
                    <h3 className="text-2xl font-bold text-center mb-2 transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="font-medium text-sm text-center leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>


            </div>
        </div>
    );
}

export default CardAnteprimaProgetti;