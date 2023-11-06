import Skeleton from '@mui/material/Skeleton';
type Props = {
    wideImage: boolean,
    nbVignettes?: number,
    title: string
}

const RowsSkeleton = ({ wideImage, nbVignettes = 6, title }: Props) => {
    let listeSkeletons = []

    for (let i = 0; i < nbVignettes; i++) {
        listeSkeletons.push(
            <div className='mr-5' key={i}>
                <Skeleton variant="rectangular" width={wideImage ? 400 : 166} height={wideImage ? 225 : 250} />
            </div>
        )
    }


    return (
        <div className=" ml-5 mt-2 text-white">
            <h2 className="text-xl font-semibold">{title}</h2>
            {
                <div className="flex flex-row overflow-y-hidden overflow-x-scroll p-5">
                    {listeSkeletons}
                </div>
            }
        </div>
    );
};

export default RowsSkeleton;