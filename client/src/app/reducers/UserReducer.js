const initialState = {
    list : [],
    item : null
}

const userReducer = (state, action) => {
    console.log('user reducer', state, action)
    switch(action.type) {
        case 'USER_LOAD_ALL':
            return {
                ...state,
                list : action.payload
            }
        default : {
            return initialState
        }
    }
}

export default userReducer;