function CardServizi({nome, servizi, prezzo}) {
    return (
        <div className="card bg-scuro-2">
            <div className="card-body">
                {/* <span className="badge badge-xs badge-warning">Most Popular</span> */}
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold">{nome}</h2>
                    <div className="flex flex-col items-end">
                        <p className="line-through text-sm text-gray-500">{prezzo * 1.8}€</p>
                        <span className="text-xl font-bold titolo-bianco">{prezzo}€</span>

                    </div>
                </div>
                <ul className="mt-6 flex flex-col w-100 gap-2 text-xs">
                    {servizi.map((servizio) =>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            {servizio}
                        </li>)}
                </ul>

            </div>
        </div>
    )
}
export default CardServizi