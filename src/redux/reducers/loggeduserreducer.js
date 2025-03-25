const INITIAL_VALUE = {
	user: { role: "", name: "", id: "", token: "" }
}

export function loggeduser(state = INITIAL_VALUE, action) {
	console.log("Reducer action triggered:", action);  // Log the action
	switch (action.type) {
		case "user":
			console.log("Updating user in Redux:", action.payload);  // Log user update
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
}
