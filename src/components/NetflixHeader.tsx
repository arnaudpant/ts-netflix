type MovieHeader = {
    imageUrl: string,
}

const NetflixHeader = ({ imageUrl }: MovieHeader) => {
    console.log(imageUrl)
    return (
        <header className="banner h-[448px] bg">
            {/* TODO: Image en background */}
            <div className="h-[190px] ml-[30px] pt-[140px]">
                <h1 className="text-5xl font-bold pb-1">La casa de papel</h1>
                <div className="mt-1">
                    <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-[#e6e6e6] text-[#000]">Lecture</button>
                    <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-slate-400 text-[#fff]">Ajouter a ma liste</button>
                </div>
                <h1 className="synopsis text-[#fff] font-normal w-full max-w-[500px] ">Le Professeur recrute une jeune braqueuse et sept autres criminels en vue d'un cambriolage grandiose ciblant la Maison royale de la monnaie d'Espagne</h1>
            </div>
        </header>
    );
};

export default NetflixHeader;