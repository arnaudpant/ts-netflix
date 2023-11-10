/** HOOKS */
/** TYPES */
/** COMPONENTS */
import { IMAGE_URL_ORIGINAL } from "../../utils/config";
import HeaderSkeleton from "../skeletons/HeaderSkeleton";

type Props = {
    movie: any
}

const NetflixHeaderId = ({movie}: Props) => {

    return (
        <header className=" relative h-[448px] text-white overflow-hidden">
            { movie ? (
                <>
                    {/* IMAGE DE FOND */}
                    <div className="absolute top-0 h-[448px] w-full z-0 ">
                        <img src={`${IMAGE_URL_ORIGINAL}${movie.data.backdrop_path}`} className="object-cover object-center h-[448px] w-full" />
                    </div>

                    <div className="absolute bottom-0 max-h-80  ml-[30px] z-20">
                        <h1 className="title-header text-5xl font-bold pb-1">
                            {
                                movie.data.title ? `${movie.data.title}` : movie.data.name
                            }
                        </h1>
                        
                        <div className="mt-1">
                            <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-[#e6e6e6] text-[#000]">Lecture</button>
                            <button className="px-8 mr-4 py-2 cursor-pointer outline-none border-none text-lg font-bold hover:opacity-70 rounded bg-slate-400 text-[#fff]">Ajouter a ma liste</button>
                        </div>

                        <div className="h-[200px] overflow-y-scroll">
                            <h2 className="synopsis text-[#fff] font-normal max-w-[640px]">{
                                `${movie.data.overview}`
                            }</h2>
                        </div>
                    </div>
                </>
            ) : (
                <HeaderSkeleton />
            )

            }



        </header>
    );
};

export default NetflixHeaderId;