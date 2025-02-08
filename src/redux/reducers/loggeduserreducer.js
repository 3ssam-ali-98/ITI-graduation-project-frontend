const INITIAL_VALUE = {
    name: ''
}

export function loggeduser (state=INITIAL_VALUE, action){

    switch(action.type){
        case "user":
            return{
                ...state,
                name: action.payload
            }
        default: 
            return state
    }
}