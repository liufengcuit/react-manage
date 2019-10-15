const userInfo = (state={}, action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case 'userInfo':
        return action.data;
    }
    return state;
}

export default userInfo;