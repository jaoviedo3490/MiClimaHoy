import Target from "./targeta";
import Alert from "./alert";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css'; // Asegúrate de importar el tema de Bootswatch
import 'bootstrap/dist/js/bootstrap.bundle.min';

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
                    <Target tipo="pronostico" />
                </div>
                {/*<div className="col">
                    <Target tipo="calidad-aire" />
                </div>*/}
            </div>
            {/*<button type="button" class="btn btn-secondary">
                Notifications <span class="badge text-bg-secondary">4</span>
            </button>*/}

        </div>
    );
}

export default ViewData;