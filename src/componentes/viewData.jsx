import Target from "./targeta";
import Alert from "./alert";
const ViewData = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Alert tipo={"temperatura"} />
                </div>
                <div className='col'>
                    <Alert tipo={"rayos uv"} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Target/>
                </div>
            </div>
        </div>
    );
}

export default ViewData;