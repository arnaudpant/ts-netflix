import Skeleton from '@mui/material/Skeleton';

const HeaderSkeleton = () => {
    return (
        <>
            <div className="absolute top-0 h-[448px] w-full z-0 bg-[#1C2833] ">
            </div>

            <div className="relative h-[190px] ml-[30px] pt-[140px] z-20">
                <h1 className="">
                    <Skeleton variant="rectangular" width={300} height={48} />
                </h1>

                <div className="mt-1 flex flex-row gap-4">
                    <Skeleton variant="rectangular" width={130} height={44} />
                    <Skeleton variant="rectangular" width={212} height={44} />
                </div>

                <div className="h-[200px] overflow-y-scroll mt-1 max-w-[640px]">
                    <Skeleton variant="rectangular"  height={200} />
                </div>

            </div>
        </>
    );
};

export default HeaderSkeleton;