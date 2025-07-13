import Target from "./targeta";
import Alert from "./alert";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const ViewData = () => {
    return (
        <div className="container">
            <div className="row g-3">
                <div className="col">
                    <Alert tipo={"temperatura"} />
                </div>
                <div className="col">
                    <Alert tipo={"rayos uv"} />
                </div>
            </div>
            <div className="row g-3">
                <div className="col-12 col-md-4">
                    <Target tipo="pronostico" />
                </div>
                <div className="col-12 col-md-4">
                    <Target tipo="calidad-aire" />
                </div>
            </div>
        </div>

    );
}

export default ViewData;