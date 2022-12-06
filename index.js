// LIBRARY CODE
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
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch,
    }
}

// APP CODE

// This is a pure function because it is not modifying the state
// Reducer for todos
function todos (state = [], action) {
    switch(action.type) {
        case 'ADD_TODO' :
            return state.concat([action.todo])
        case 'REMOVE_TODO' :
            return state.filter((todo) => todo.id !== action.id)
        case 'TOGGLE_TODO' :
            return state.map((todo) => 
                todo.id !== action.id ? 
                todo : 
                Object.assign({}, todo, { complete: !todo.complete })
                //create a new object, add all the todo apart of the complete
            );
        default :
            return state
    }
}

// Reducer for goals
function goals (state = [], action) {
    switch(action.type) {
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL' :
            return state.filter((goal) => goal.id !== action.id)
        default :
            return state
    }
}

// Combine reducers (todos and goals)
function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}

// We pass the root reducer to our store because
// the createStore() function can only take in one reducer
const store = createStore(app)
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
