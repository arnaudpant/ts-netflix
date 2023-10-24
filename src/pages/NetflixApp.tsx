import { AppBar, Toolbar, Typography } from "@mui/material";

//TODO: voir MUI theme
const NetflixApp = () => {
    return (
        <div>

            <AppBar>
                <Toolbar>
                    <img src="/images/netflix-logo.png" alt="logo Netflix" className="h-5" color="secondary" />
                    <a href="#"><Typography variant="h6">Accueil</Typography></a>
                    <a href="#"><Typography variant="h6">Séries</Typography></a>
                    <a href="#"><Typography variant="h6">Films</Typography></a>
                    <a href="#"><Typography variant="h6">Nouveautés</Typography></a>
                    <a href="#"><Typography variant="h6">Ma liste</Typography></a>
                    <img src="/images/netflix-avatar.png" alt="logo Netflix" className="h-5" />
                </Toolbar>
            </AppBar>



            <header>
                <div>
                    <h1>La casa de papel</h1>
                    <div>
                        <button>Lecture</button>
                        <button>Ajouter a ma liste</button>
                    </div>
                    <h1>le Professeur recrute une jeune braqueuse et sept autres criminels en vue d'un cambriolage grandiose ciblant la Maison royale de la monnaie d'Espagne</h1>
                </div>
            </header>



            <div>
                <h2>Films Netflix</h2>
                <div>
                    <img src="/images/sample.jpg" alt="" className="sample-img " />
                    <img src="/images/sample1.jpg" alt="" className="sample-img " />
                    <img src="/images/sample.jpg" alt="" className="sample-img " />
                    <img src="/images/sample1.jpg" alt="" className="sample-img " />
                </div>
            </div>


            <div>
                <h2>Séries Netflix</h2>
                <div>
                    <img src="/images/sample-poster.jpg" alt="" className="sample-img " />
                    <img src="/images/sample-poster1.jpg" alt="" className="sample-img " />
                    <img src="/images/sample-poster.jpg" alt="" className="sample-img " />
                    <img src="/images/sample-poster1.jpg" alt="" className="sample-img " />
                </div>
            </div>


            <footer>Netflix Clone</footer>
        </div>
    );
};

export default NetflixApp;