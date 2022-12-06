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

const store = createStore(todos)
store.subscribe(()=>{
    console.log('The new state is: ', store.getState())
})
// All the time I want to change the state, I just need to call dispatch
store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
})
