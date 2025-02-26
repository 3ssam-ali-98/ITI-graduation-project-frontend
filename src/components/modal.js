

function Modal(props) {
	return (
		<>
			<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={props.modal_button}>
				{props.modal_button_text}
			</button>
			<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="staticBackdropLabel">{props.modal_title}</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							{props.modal_message}
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-bs-dismiss="modal">{props.modal_reject_text}</button>
							<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={props.modal_accept}>{props.modal_accept_text}</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal