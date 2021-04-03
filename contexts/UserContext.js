import React, {useState, createContext} from 'react';

const UserContext = createContext([{}, () => {}])

const UserProvider = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        Uid : '',
        isLoggedIn: ''
    })

    return <UserContext.Provider value={[state, setState]}>{props.children}</UserContext.Provider>
}

export {UserContext, UserProvider}