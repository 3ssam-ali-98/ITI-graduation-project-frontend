const INITIAL_VALUE = {
    name: '',
    id: ''
}

export function loggeduser (state=INITIAL_VALUE, action){

    switch(action.type){
        case "user":
            return{
                ...state,
                name: action.payload
            }
        case "id":  
        return{
            ...state,
            id: action.payload
        }  
        default: 
            return state
    }
}