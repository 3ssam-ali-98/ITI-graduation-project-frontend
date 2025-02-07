function ServiceCard(props) {
    return (
        <div className="col-md-4">
            <div className="card h-100">
                <div className="card-body text-center">
                    <h5 className="card-title" style={{ color: "#4D869C" }}>{props.title}</h5>
                    <p className="card-text" style={{ color: "#7AB2B2" }}>{props.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ServiceCard;