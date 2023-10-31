import { useState } from "react";
import { MovieHeader } from "../type/types";


const NetflixHeader = ({ movie }: MovieHeader) => {

    let movieDefault: MovieHeader = {
        movie: {
            backdrop_path: '/header/banner.jpg',
            title: 'La casa de papel',
            overview: "Le Professeur recrute une jeune braqueuse et sept autres criminels en vue d'un cambriolage grandiose ciblant la Maison royale de la monnaie d'Espagne"
        }
    }

    const [imgURL, setImgURL] = useState("")
    if (movie) {
        setImgURL(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`)
    }


    return (
        <header className="relative h-[448px] text-white">
            <div className="absolute top-0 h-[448px] w-full z-0 ">
                {
                    imgURL !== "" ? (<img src={`${imgURL}`} className="object-cover object-center h-[448px] w-full" />) : (<img src={`${movieDefault.movie.backdrop_path}`} className="object-cover object-center h-[448px] w-full" />)
                }
            </div>
            <div className="relative h-[190px] ml-[30px] pt-[140px] z-20">
                <h1 className="text-5xl font-bold pb-1">{
                    movie ? `${movie.title}` : `${movieDefault.movie.title}`
                }</h1>
                <div className="mt-1">
                    <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-[#e6e6e6] text-[#000]">Lecture</button>
                    <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-slate-400 text-[#fff]">Ajouter a ma liste</button>
                </div>
                <div className="h-[200px] overflow-y-scroll">
                    <h1 className="synopsis text-[#fff] font-normal max-w-[640px]">{
                        movie ? `${movie.overview}` : `${movieDefault.movie.overview}`
                    }</h1>
                </div>
            </div>
        </header>
    );
};

export default NetflixHeader;