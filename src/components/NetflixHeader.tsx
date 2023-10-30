import { MovieHeader } from "../type/types";
import clsx from "clsx";


const NetflixHeader = ({ movie }: MovieHeader) => {

    let movieDefault: MovieHeader = {
        movie: {
            backdrop_path: '/header/banner.jpg',
            title: 'La casa de papel',
            overview: "Le Professeur recrute une jeune braqueuse et sept autres criminels en vue d'un cambriolage grandiose ciblant la Maison royale de la monnaie d'Espagne"
        }
    }



    let imgURL: string = ""
    if (movie) {
        imgURL = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        console.log(movie)
    }

    return (
        <header className={clsx('h-[448px] bg-center bg-cover object-cover text-white overflow-hidden z-10', imgURL !== "" ? `bg-[url('${imgURL}')]` : `bg-[url('${movieDefault.movie.backdrop_path}')]`)}>
            <div className="h-[190px] ml-[30px] pt-[140px]">
                <h1 className="text-5xl font-bold pb-1">{
                    movie ? `${movie.title}` : `${movieDefault.movie.title}`
                }</h1>
                <div className="mt-1">
                    <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-[#e6e6e6] text-[#000]">Lecture</button>
                    <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-slate-400 text-[#fff]">Ajouter a ma liste</button>
                </div>
                <h1 className="synopsis text-[#fff] font-normal w-full max-w-[600px]">{
                    movie ? `${movie.overview}` : `${movieDefault.movie.overview}`
                }</h1>
            </div>
        </header>
    );
};

export default NetflixHeader;