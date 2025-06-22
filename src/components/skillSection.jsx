
const SkillSection = ({ title, skills, currentSkill, setCurrentSkill }) => {
    const circumference = 2 * Math.PI * 120;
    return (
        <>
                <h1 className="text-center text-4xl md:text-6xl py-10">{title}</h1>
            <section className="px-4 py-10 bg-chiaro rounded-xl space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-10">
                {/* Lista pulsanti con svg */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
                    {skills.map((skill) => (
                        <div className="indicator hover:scale-96 transition-all duration-300" key={skill.name}>
                            <>
                                <span
                                    dangerouslySetInnerHTML={{ __html: skill.svg }}
                                    className={`indicator-item bg-scuro p-2 rounded-full ${currentSkill.name === skill.name ? 'font-bold ring-2 ring-gray-100' : ''
                                        }`}
                                ></span>
                                <button
                                    className={`px-2 py-2 text-lg md:text-xl  text-bianco transition bg-scuro rounded-md h-14 w-38 lg:w-48 hover:bg-blue-700 ${currentSkill.name === skill.name ? 'font-bold ring-2 ring-gray-100' : ''
                                        }`}
                                    onClick={() => setCurrentSkill(skill)}
                                >
                                    {skill.name}
                                </button>
                            </>
                        </div>
                    ))}
                </div>

                {/* Cerchio percentuale */}
                <div className="flex items-center justify-center">
                    <div className="relative w-72 h-72">
                        <svg className="transform -rotate-90 w-full h-full">
                            <circle
                                cx="145"
                                cy="145"
                                r="120"
                                stroke="currentColor"
                                strokeWidth="30"
                                fill="transparent"
                                className="text-gray-700"
                            />
                            <circle
                                cx="145"
                                cy="145"
                                r="120"
                                stroke="currentColor"
                                strokeWidth="30"
                                fill="transparent"
                                className="text-scuro"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - (currentSkill.percent / 100) * circumference}
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-5xl">
                            {currentSkill.percent}%
                        </span>
                    </div>
                </div>
            </section>

        </>
    );
}
export default SkillSection;