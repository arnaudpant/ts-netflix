import { Toolbar } from "@mui/material";


const Error404 = () => {
    return (
        <div className="bg-[#111] relative h-[100vh]">
            <div className="absolute">
                <Toolbar  >
                    <img src="/vignettes/netflix-logo.png" alt="logo Netflix" className="h-5" color="secondary" />
                </Toolbar>
            </div>
            <div className="flex flex-col h-full justify-center items-center">
                <h1 className="text-white text-2xl">ERREUR 404</h1>
            </div>
        </div>
    );
};

export default Error404;