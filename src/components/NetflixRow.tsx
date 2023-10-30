type Props = {
    title: string,
    wideImage: boolean
}

const NetflixRow = ({ title, wideImage }: Props) => {
    return (
        <>
            <div className="text-white ml-5">
                <h2>{title}</h2>
                {
                    wideImage ? (
                        <div className="flex overflow-y-hidden overflow-x-scroll p-5">
                            {/* TODO: transition */}
                            <img src="/vignettes/sample.jpg" alt="" className="vignettes cursor-pointer object-contain w-full max-h-[250px] mr-3 hover:scale-110" />
                            <img src="/vignettes/sample1.jpg" alt="" className="vignettes cursor-pointer w-full object-contain max-h-[250px] mr-3 hover:scale-110" />
                            <img src="/vignettes/sample.jpg" alt="" className="vignettes cursor-pointer w-full object-contain max-h-[250px] mr-3 hover:scale-110" />
                            <img src="/vignettes/sample1.jpg" alt="" className="vignettes cursor-pointer w-full object-contain max-h-[250px] mr-3 hover:scale-110" />
                        </div>

                    ) : (
                        <div className="flex overflow-y-hidden overflow-x-scroll p-5">
                            <img src="/vignettes/sample-poster.jpg" alt="" className="cursor-pointer object-contain w-full max-h-[250px] mr-3 hover:scale-110" />
                            <img src="/vignettes/sample-poster1.jpg" alt="" className="cursor-pointer object-contain w-full max-h-[250px] mr-3 hover:scale-110" />
                            <img src="/vignettes/sample-poster.jpg" alt="" className="cursor-pointer object-contain w-full max-h-[250px] mr-3 hover:scale-110" />
                            <img src="/vignettes/sample-poster1.jpg" alt="" className="cursor-pointer object-contain w-full max-h-[250px] mr-3 hover:scale-110" />
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default NetflixRow;