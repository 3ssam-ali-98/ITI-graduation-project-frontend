
const INITIAL_VALUE = {

    user: { role: "", name: "", id: "" }
    

}

export function loggeduser(state = INITIAL_VALUE, action) {


    switch(action.type){
        case "user":
            return{
                ...state,
                user: action.payload
            }
        // case "id":  
        // return{
        //     ...state,
        //     id: action.payload
        // }  
        default: 
            return state
    }

}