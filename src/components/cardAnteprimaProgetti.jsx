function CardAnteprimaProgetti({ title, description, imageUrl, link }) {
    return (
        <div className="group h-full flex flex-col relative overflow-hidden rounded-2xl bg-chiaro shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 card-sfondo-bianco">
            <div className="relative object-contain flex-shrink-0">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-auto object-contain transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent  group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay con link progetto (opzionale) */}
                {link && (
                    <div className="absolute top-4 left-4 flex gap-1 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 duration-300">
                            <span><i className="bi bi-tv"></i> View </span>
                        </a>
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-3xl font-bold text-center mb-2 transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="font-medium text-lg text-center leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CardAnteprimaProgetti;