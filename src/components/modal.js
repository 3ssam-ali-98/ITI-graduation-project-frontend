function Modal(props) {
    return (
        <div className="modal fade" id={props.modal_id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`${props.modal_id}-label`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`${props.modal_id}-label`}>{props.modal_title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.modal_message}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{props.modal_reject_text}</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.modal_accept}>{props.modal_accept_text}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
