# Redux project
## Rules to increase the predictability of the state in the application:
***
## 1. Only an event can change the state of the store.
## 2. The function that returns the new state needs to be a pure function.
Pure functions are integral to how state in Redux applications is updated. By definition, pure functions:

- Return the same result if the same arguments are passed in
- Depend solely on the arguments passed into them
- Do not produce side effects, such as API requests and I/O operations

***
## Reducers
* They must be pure
* Though each reducer handles a different slice of state, we must combine reducers into a single reducer to pass to the store
* They are typically named after the slices of state they manage
