

function Input(props){


    return(
        <div className="mb-3">
            <label htmlFor={props.idn} className="form-label">{props.inlabl}</label>
            <input type={props.intype} className="form-control" id={props.idn} placeholder={props.plchold} onBlur={props.blurfun} onChange={props.chgfun} value={props.initval}/>
            {<div className="valid-feedback">{props.valmsg}</div>}
            {<div className="invalid-feedback">{props.invalmsg}</div>}


        </div>
    )
}

export default Input