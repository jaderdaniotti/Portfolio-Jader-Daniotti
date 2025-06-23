function CardServizi({ nome, servizi, prezzo }) {
    return (
        <div className="card bg-scuro-2 rounded-4xl border-1 border-gray-500 shadow-lg hover:shadow-2xl py-5 px-3 lg:px-6 transition-shadow duration-300">
            <div className="card-body ">
                <div className="flex-col  ">
                    <h2 className="text-3xl font-extrabold tracking-tight">{nome}</h2>
                    <div className="flex flex-col">
                        {prezzo ? (<><p className="line-through text-lg text-gray-500 mt-1">{(prezzo * 1.8).toFixed(2)}€</p><span className="text-4xl tracking-tight font-bold">{prezzo}€</span></>) : ""}
                    </div>
                </div>
                <hr className="my-4" />
                <a href="#contattisection" className="btn bg-bianco px-8 text-scuro-2 rounded-4xl text-md w-min ">Contattami</a>
                <ul className="mt-8 flex flex-col h-full gap-3 text-md ">
                    {servizi.map((servizio, idx) => (
                        <li key={idx} className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5 mr-2 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{servizio}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default CardServizi