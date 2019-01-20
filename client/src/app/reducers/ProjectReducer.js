const initialState = {
    list : [],
    item : null
}

const projectReducer = (state, action) => {
    console.log('project reducer', state, action)
    switch(action.type) {
        case 'PROJECT_LOAD_ALL':
            return {
                ...state,
                list : action.payload
            }
        default : {
            return initialState
        }
    }
}

export default projectReducer;