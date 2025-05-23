function Modal(props) {

	return (
		<>
			<button type="button" class="btn btn-danger mb-3" data-bs-toggle="modal" data-bs-target={`#modal-${props.target}`} onClick={props.modal_button} id={props.id} hidden={props.hidden}>
				{props.modal_button_text}
			</button>
			<div class="modal fade" id={`modal-${props.target}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`modalLabel-${props.target}`} aria-hidden="true">
				<div class={`modal-dialog modal-dialog-${props.location} modal-${props.size}`} >
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id={`modalLabel-${props.target}`}>{props.modal_title}</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.modal_close}></button>
						</div>
						<div class="modal-body">
							{props.modal_message}
						</div>
						<div class="modal-footer">
							{props.modal_reject_text && (<button type="button" class="btn btn-primary" data-bs-dismiss="modal">{props.modal_reject_text}</button>)}
							<button type="button" class={`btn btn-${props.color || "danger"}`} data-bs-dismiss="modal" onClick={props.modal_accept}>{props.modal_accept_text}</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal;
