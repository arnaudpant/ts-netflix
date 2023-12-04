import { CircularProgress } from "@mui/material";

const LoadingFullScreen = () => {
    return (
        <div className="absolute top-0 bottom-0 w-full flex items-center justify-center bg-[#111]">
            <CircularProgress color="success" />
        </div>
    );
};

export default LoadingFullScreen;