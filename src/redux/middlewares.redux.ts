export function callAPIMiddleware({ dispatch, getState }) {
    return next => action => {
      const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action

      if (!types) {
        // Normal action: pass it on
        return next(action)
      }
        console.log("middleware called",action);
      if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
      ) {
        throw new Error('Expected an array of three string types.')
      }
  
      if (typeof callAPI !== 'function') {
        throw new Error('Expected callAPI to be a function.')
      }
  
      if (!shouldCallAPI(getState())) {
        return
      }
  
      const [requestType, successType, failureType] = types
      console.log("dispatch",Object.assign({}, payload, {
        type: requestType
      }))
      dispatch(
        Object.assign({}, payload, {
          type: requestType
        })
      )

      return callAPI(getState()).then(
        (response) =>
        {
          console.log("middleware-response",response);
          dispatch(
            Object.assign({}, payload, {
              payload:response,
              type: successType
            })
          )
        },
        (error )=>{
          console.log("middleware-error",error)
          dispatch(
            Object.assign({}, payload, {
              error:error.message,
              type: failureType
            })
          )
        }
      )
    }
  }

