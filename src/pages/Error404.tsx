import { Toolbar } from "@mui/material";


const Error404 = () => {
    return (
        <div className="bg-[#111] relative">
                <Toolbar  >
                    <img src="/vignettes/netflix-logo.png" alt="logo Netflix" className="h-5" color="secondary" />
                </Toolbar>
            <div className="flex flex-col w-full">
                <h1>ERREUR 404</h1>
            </div>
        </div>
    );
};

export default Error404;