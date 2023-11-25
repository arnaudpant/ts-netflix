import NetflixAppBar from "../components/NetflixAppBar";
import NetflixFooter from "../components/layout/NetflixFooter";


const NetflixSearch = () => {


    return (
        <div className="bg-[#111] relative min-h-screen">
            <NetflixAppBar />
            <div className=" relative py-20 px-8 h-16">
                <input type="text" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 border-none  sm:text-sm sm:leading-6" placeholder="Rechercher" />
            </div>
            <p className="text-white text-center text-3xl">See you soon</p>
            <NetflixFooter />
        </div>
    );
};

export default NetflixSearch;