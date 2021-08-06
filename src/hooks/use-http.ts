import { useReducer, useCallback } from 'react';

function httpReducer(state:{data:any, error:string|null, status:string|null},
                     action:{type:string, responseData:any, errorMessage:string}) {
    if (action.type === 'SEND') {
        return {
            data: null,
            error: null,
            status: 'pending',
        };
    }

    if (action.type === 'SUCCESS') {
        return {
            data: action.responseData,
            error: null,
            status: 'completed',
        };
    }

    if (action.type === 'ERROR') {
        return {
            data: null,
            error: action.errorMessage,
            status: 'completed',
        };
    }

    return state;
}

function useHttp(requestFunction:(data:any)=>void, startWithPending = false) {
    const [httpState, dispatch] = useReducer(httpReducer, {
        status: startWithPending ? 'pending' : null,
        data: null,
        error: null,
    });

    const sendRequest = useCallback(
        async function (requestData) {
            dispatch({ type: 'SEND', errorMessage:'', responseData:{} });
            try {
                const responseData = await requestFunction(requestData);
                dispatch({ type: 'SUCCESS', responseData, errorMessage:'' });
            } catch (error) {
                dispatch({
                    type: 'ERROR',
                    errorMessage: error.message || 'Something went wrong!',
                    responseData:{}
                });
            }
        },
        [requestFunction]
    );

    return {
        sendRequest,
        ...httpState,
    };
}

export default useHttp;
