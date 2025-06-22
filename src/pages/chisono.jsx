
import BigButton from '../components/bigButton'
import Navbar from "../Navbar";
import Footer from "../Footer";
function Chisono() {
    return (
        <>
            <Navbar></Navbar>
            <div className="py-10 px-5" id="indice">
                <h1 className="text-center text-6xl md:text-8xl py-20 titolo-bianco">JADER</h1>
                <hr className='mb-10' />
                <ul className="list mt-5 bg-chiaro-2 shadow rounded-box ">
                    <li className="p-4 pb-2 text-2xl  opacity-60 tracking-wide">Il mio percorso</li>

                    <li className="list-row">
                        <div className="text-4xl self-center font-thin opacity-30 tabular-nums">01</div>
                        <div><img className="size-15 rounded-box" src="immagini\AVATAR\1-Photoroom.png" /></div>
                        <div className="list-col-grow flex items-center font-semibold text-xl">
                            <div>Chi sono?</div>
                        </div>
                        <a href="#aboutme" className="p-3 motion-safe:animate-bounce">
                            <i class="bi bi-arrow-down-circle text-2xl"></i>
                        </a>
                    </li>

                    <li className="list-row">
                        <div className="text-4xl self-center font-thin opacity-30 tabular-nums">02</div>
                        <div><img className="size-15 rounded-box" src="immagini\AVATAR\9.png" /></div>
                        <div className="list-col-grow flex items-center font-semibold text-xl">
                            <div>La partenza</div>
                        </div>
                        <a href="#partenza" className="p-3 motion-safe:animate-bounce">
                            <i class="bi bi-arrow-down-circle text-2xl"></i>
                        </a>
                    </li>

                    <li className="list-row">
                        <div className="text-4xl self-center font-thin opacity-30 tabular-nums">03</div>
                        <div><img className="size-15 rounded-box" src="immagini\AVATAR\11-Photoroom.png" /></div>
                        <div className="list-col-grow flex items-center font-semibold text-xl">
                            <div>Il lavoro</div>
                        </div>
                        <a href="#lavoro" className="p-3 motion-safe:animate-bounce">
                            <i class="bi bi-arrow-down-circle text-2xl"></i>
                        </a>
                    </li>

                    <li className="list-row">
                        <div className="text-4xl self-center font-thin opacity-30 tabular-nums">04</div>
                        <div><img className="size-15 rounded-box" src="immagini\AVATAR\4-Photoroom (1).png" /></div>
                        <div className="list-col-grow flex items-center font-semibold text-xl">
                            <div>Dev-Mode</div>
                        </div>
                        <a href="#devmode" className="p-3 motion-safe:animate-bounce">
                            <i class="bi bi-arrow-down-circle text-2xl"></i>
                        </a>
                    </li>

                </ul>
                <hr className="my-10" />
                {/* Chi sono? */}
                <section className="flex flex-col items-center text-center" id="aboutme">
                    <h2 className="text-center mb-5 text-5xl md:text-6xl ">Chi sono?</h2>
                    <img src="immagini\AVATAR\10-Photoroom.png" alt="" className="mb-5 h-100 object-contain" />
                    <div className="grid grid-cols-12 gap-4">
                        <div className='col-span-12'>
                            <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                                Ciao! Mi chiamo
                                <span className="titolo-bianco font-extrabold"> Jader </span>
                                e ti do il benvenuto sul mio sito web.
                            </p>
                            <p className=" text-xl md:text-2xl text-chiaro text-center" >
                                Sono quel tipo di persona a cui piacciono le <span className="titolo-bianco font-extrabold"> sfide </span>, a cui piace imparare sempre cose nuove, prendendo spunto da ciò che lo circonda.
                            </p>
                            <p className=" text-xl md:text-2xl text-chiaro text-center" >
                                Se sei arrivato in questa sezione del sito, vuol dire che non sei solo interessato al mio lato <span className="titolo-bianco font-extrabold"> professionale </span>, ma vuoi conoscermi davvero. Cercherò di farti avere un’idea più chiara di me!
                            </p>
                        </div>
                    </div>
                </section>
                <hr className="my-10" />
                {/* La partenza */}
                <section className="flex flex-col items-center" id="partenza">
                    <h2 className="text-center mb-5 text-5xl md:text-6xl ">La partenza</h2>
                    <img src="immagini\AVATAR\9.png" alt="" className="mb-5 h-100 object-contain" />
                    <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                        Ho cominciato il mio percorso alle superiori, in un <span className="titolo-bianco font-extrabold"> CFP </span> &#40;Corso di Formazione Professionale&#41;, studiando come elettricista. <br />
                        A quell'età non avevo ancora in mente cosa volessi fare da grande. Volevo buttarmi nel mondo del lavoro, quindi decisi di fare 3 anni su 5 in alternanza <span className="titolo-bianco font-extrabold"> scuola/lavoro</span>.
                    </p>
                    <p className=" text-xl md:text-2xl text-chiaro text-center" >
                        A 18 anni, nel 2019, stanco della vita che conducevo, mi venne offerta un’occasione d'oro: partire per lavorare in un altro stato, in compagnia di un amico.
                    </p>
                    <p className=" text-xl md:text-2xl text-chiaro text-center" >
                        Senza pensarci troppo, dopo qualche settimana passata a organizzare i documenti, preparare i vestiti e salutare tutti, mi ritrovai in <span className="titolo-bianco font-extrabold"> Francia </span>, più precisamente a Fontaine, periferia di Grenoble, Rhone Alpes.
                    </p>
                </section>

                <hr className="my-10" />
                {/* Il lavoro */}
                <section className="flex flex-col items-center" id="lavoro">
                    <h2 className="text-center mb-5 text-5xl md:text-6xl ">Il lavoro</h2>
                    <img src="immagini\AVATAR\11-Photoroom.png" alt="" className="mb-5 h-100 object-contain " />
                    <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                        Durante i primi tempi in <span className="titolo-bianco font-extrabold"> Francia </span>, partendo da zero a livello linguistico, feci pratica lavorando nei mercati il <span className="titolo-bianco font-extrabold"> weekend </span>, attività che mi permise di imparare a parlare il francese pur continuando a vendere prodotti italiani. <span className="titolo-bianco font-extrabold"> Dal lunedì al venerdì </span>, invece, giravo le regioni limitrofe lavorando nei cantieri, alternando i ruoli di <span className="titolo-bianco font-extrabold"> manovale </span> e <span className="titolo-bianco font-extrabold"> lavavetri </span>.
                    </p>
                    <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                        Al secondo anno, ebbi l’occasione di riprendere ciò che avevo studiato in Italia, ovvero <span className="titolo-bianco font-extrabold"> l’elettricità</span>. Venni assunto da un’azienda che forniva kit di impianti elettrici, imparando in seguito a lavorare anche su impianti di <span className="titolo-bianco font-extrabold"> idraulica </span> e <span className="titolo-bianco font-extrabold"> riscaldamento </span>.
                    </p>
                    <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                        La mia carriera durò due anni, finché poi, dopo un’allettante offerta lavorativa, entrai in un’azienda <span className="titolo-bianco font-extrabold"> leader </span> nella realizzazione di mezzi di soccorso, tra cui ambulanze e veicoli per interventi dei pompieri. Con loro partii in trasferte, fino ad arrivare a gestire la manutenzione di <span className="titolo-bianco font-extrabold"> queste ultime</span>, anche in <span className="titolo-bianco font-extrabold"> Romania </span>.
                    </p>
                </section>

                <hr className="my-10" />
                {/* Dev-Mode */}
                <section className="flex flex-col items-center" id="devmode">
                    <h2 className="text-center mb-5 text-5xl md:text-6xl ">Dev-Mode</h2>
                    <span className="">
                        <img src="immagini\AVATAR\4-Photoroom (1).png" alt="" className="mb-5 h-100 object-contain rounded-4xl" />
                    </span>
                    <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                        Dopo 5 anni, decisi di tornare in <span className="titolo-bianco font-extrabold"> Italia </span>, vicino alla mia famiglia e ai miei amici.
                    </p>
                    <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                        Cominciai a lavorare in un’azienda come elettromeccanico, ma a settembre mi imbatto per puro caso in una pubblicità di un <span className="titolo-bianco font-extrabold"> Bootcamp </span> per diventare <span className="titolo-bianco font-extrabold"> FullStack Developer</span>.
                    </p>
                    <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                        Ai tempi non avevo la più pallida idea di cosa significasse scrivere <span className="titolo-bianco font-extrabold"> codice</span>. Avevo creato un sito <span className="titolo-bianco font-extrabold"> ecommerce </span> qualche anno prima con <span className="titolo-bianco font-extrabold"> Shopify </span> seguendo tutorial su <span className="titolo-bianco font-extrabold"> Youtube</span>, ma non potevo nemmeno immaginare cosa sarebbe significato, di lì a qualche mese, saperlo fare scrivendo <span className="titolo-bianco font-extrabold"> codice </span> e personalizzando tutto dalla A alla Z.
                    </p>
                    <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                        Decisi quindi di iscrivermi. Iniziai il corso a ottobre in orario part-time, la sera dopo il lavoro, finché non mi lasciai quest’ultimo a dicembre per dedicare l’intera giornata allo <span className="titolo-bianco font-extrabold"> studio </span> e alla <span className="titolo-bianco font-extrabold"> pratica</span>.
                    </p>
                    <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                        In parallelo al corso, approfondisco gli argomenti trattati in autonomia, realizzo progetti di prova per esercitarmi e, occasionalmente, creo <span className="titolo-bianco font-extrabold"> web app </span> per <span className="titolo-bianco font-extrabold"> privati </span> o <span className="titolo-bianco font-extrabold"> collaboro </span>con amici alla realizzazione di progetti.
                    </p>
                    <p className=" text-xl  md:text-2xl text-chiaro text-center" >
                        Dopo vari progetti e tanti pezzi di me messi in progetti altrui, eccomi qui a costruire il sito che parla di me, <span className="titolo-bianco font-extrabold"> Jader</span>, per farti davvero capire chi sono.
                    </p>
                </section>

                <hr className="my-10" />
                <a className="cta mt-5 mx-auto w-auto" href='#indice' >
                    <span className="span">Torna su</span>
                    <span className="second">
                        <svg
                            width="50px"
                            height="20px"
                            viewBox="0 0 66 43"
                            version="1.1"
                        >
                            <g
                                id="arrow"

                            >
                                <path
                                    className="one"
                                    d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                    fill="#FFFFFF"
                                ></path>
                                <path
                                    className="two"
                                    d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                    fill="#FFFFFF"
                                ></path>
                                <path
                                    className="three"
                                    d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                                    fill="#FFFFFF"
                                ></path>
                            </g>
                        </svg>
                    </span>
                </a>
            </div>
            <Footer></Footer>
        </>
    )
}
export default Chisono