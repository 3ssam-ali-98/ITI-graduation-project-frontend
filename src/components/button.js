function Button(props){
    return(
        <>
            <div>
                <button className={`btn btn-${props.bclr}`} style={{height:"auto", width:props.wid, marginBottom: props.mar}} onClick={props.clck}> {props.title1}</button>  

            </div>    
        </>
    )
}

export default Button