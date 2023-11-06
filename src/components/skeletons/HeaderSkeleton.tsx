import Skeleton from '@mui/material/Skeleton';

const HeaderSkeleton = () => {
    return (
        <header className=" relative h-[448px] overflow-hidden bg-[#1C2833]">

            <div className="absolute bottom-1 h-80  ml-[30px] z-20 w-full max-w-[640px]">
                <h1 className=''>
                    <Skeleton variant="rectangular" width={300} height={48} />
                </h1>

                <div className="mt-2 flex flex-row gap-4">
                    <Skeleton variant="rectangular" width={130} height={44} />
                    <Skeleton variant="rectangular" width={212} height={44} />
                </div>

                <div className="mt-2 h-[150px] w-full">
                    <Skeleton variant="rectangular"  height={200} />
                </div>
            </div>
        </header>
    );
};

export default HeaderSkeleton;