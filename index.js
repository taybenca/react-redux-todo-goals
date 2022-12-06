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
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Action creators
function addTodoAction (todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction (id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction (goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction (id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

// This is a pure function because it is not modifying the state
// Reducer for todos
function todos (state = [], action) {
    switch(action.type) {
        case ADD_TODO :
            return state.concat([action.todo])
        case REMOVE_TODO :
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO :
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
        case ADD_GOAL :
            return state.concat([action.goal])
        case REMOVE_GOAL :
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
store.dispatch(addTodoAction({
    id: 0,
    name: 'Learn Redux',
    complete: false
}))

store.dispatch(addTodoAction({
    id: 1,
    name: 'Wash  the car',
    complete: false
}))

store.dispatch(addTodoAction({
    id: 2,
    name: 'Go to the gym',
    complete: true
}))

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux',
}))

store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 20 pounds',
}))

store.dispatch(removeGoalAction(0))

// Prefer constants rather than strings as the values of type properties. 
// Both work -- but when using constants, the console will 
// throw an error rather than fail silently should there be any misspelling