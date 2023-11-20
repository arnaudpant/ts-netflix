import NetflixAppBar from "../components/NetflixAppBar";
import { Link } from "react-router-dom";


const Error404 = () => {
    return (
        <div className="bg-error-404 bg-cover bg-center relative flex flex-col justify-center items-center h-[100vh]">
        <NetflixAppBar />
        <div className="flex flex-col justify-center items-center gap-5">
            <h1 className="text-4xl text-white font-bold">Vous cherchez votre chemin ?</h1>
            <p className="text-white text-sm">Désolé, nous n'avons pas trouvé cette page. Un vaste choix de programmes vous attend sur la page d'accueil</p>
            <div>
                <Link to="/"><div className="bg-white text-black px-4 py-2">Accueil Netfix</div></Link>
            </div>
        </div>
        <div className="absolute bottom-8">
                <p className="text-white ">Code d'erreur : 404</p>
            </div>
    </div>
    );
};

export default Error404;