// Library code
function createStore (reducer) {
    // The store should have four parts
    // 1. The state
    // 2. Get the state
    // 3. Listen to changes on the state
    // 4. Update the state

    let state
    let listeners = []

    // Get the state
    const getState = () => state

    // Listen to changes on the state
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => {l !== listener})
        }
    }

    // Update the state
    const dispatch = (action) => {
        state = todos(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch,
    }
}

// App code
// This is a pure function because it is not modifying the state
function todos (state = [], action) {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    }

    return state
}
