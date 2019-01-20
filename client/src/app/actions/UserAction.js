import { get } from 'axios';

export const userAll = (dispatch) => () => {
    let url = 'http://localhost:5000/users';
    get(url, {
        headers : {
            Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDIwYTA4Y2RhODExMGQ5MDU5NGNlNCIsImFjY2VzcyI6ImF1dGgiLCJlbWFpbCI6ImhhbmlmYW5tb2hhbWFkQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiaGFuaWZhbm0iLCJpYXQiOjE1NDc5MTM3MjV9.FqWF8rxg4iY0DbHf3Kn2RmX8Vu-_LF6Qc_BR3wRS308'
        }
    }).then(result => {
        console.log(result);
        dispatch({
            type: 'USER_LOAD_ALL',
            payload: result.data.users
        })
    })
}