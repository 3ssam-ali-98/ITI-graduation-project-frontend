const INITIAL_VALUE = {
	user: {
		role: sessionStorage.getItem("role") || "",
		name: sessionStorage.getItem("name") || "",
		id: sessionStorage.getItem("id") || "",
		token: sessionStorage.getItem("token") || ""
	}
};
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
