import NetflixAppBar from "../components/NetflixAppBar";
import NetflixFooter from "../components/NetflixFooter";
import NetflixHeader from "../components/NetflixHeader";
import NetflixRow from "../components/NetflixRow";


const NetflixApp = () => {

    return (
        <div className="bg-[#111]">
            <NetflixAppBar />
            <NetflixHeader imageUrl="test" />
            <NetflixRow title="Netflix films" wideImage={true} />
            <NetflixRow title="Netflix séries" wideImage={false} />
            <NetflixFooter />
        </div>
    );
}; 

export default NetflixApp;