import Target from "./targeta";
import Alert from "./alert";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const ViewData = () => {
    return (
        <div className="container">
            <section className="row g-3">
                <div className="col-12 col-md-6">
                    <Alert tipo="Temperatura" />
                </div>
                <div className="col-12 col-md-6">
                    <Alert tipo="Radiacion UV" />
                </div>
            </section>
            <section className="row g-3 mt-3">
                <div className="col-12 col-md-4">
                    <Target tipo="pronostico" />
                </div>
                <div className="col-12 col-md-4">
                    <Target tipo="calidad-aire" />
                </div>
                <div className="col-12 col-md-4">
                    <Target tipo="otra-seccion" />
                </div>
            </section>
        </div>

    );
}

export default ViewData;