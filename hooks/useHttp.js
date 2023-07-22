import { useReducer, useCallback } from 'react';

const httpReducer = (httpState, action) => {
	if (action.type === 'SEND') {
		return { loading: true, error: null, data: null };
	} else if (action.type === 'RESPONSE') {
		return { ...httpState, loading: false, data: action.responseData };
	} else if (action.type === 'ERROR') {
		return { ...httpState, loading: false, error: action.errorData };
	}
	return httpState;
};

const useHttp = (initialLoading = false) => {
	const [httpState, dispatch] = useReducer(httpReducer, {
		loading: initialLoading,
		error: null,
		data: null,
	});

	const sendRequest = useCallback(
		async (fn, args, cb) => {
			dispatch({ type: 'SEND' });
			try {
				const responseData = await fn(args);
				dispatch({ type: 'RESPONSE', responseData });
				if (cb) cb(responseData);
			} catch (err) {
				dispatch({ type: 'ERROR', errorData: err.message });
			}
		},
		[dispatch],
	);

	const clearError = useCallback(() => {
		dispatch({ type: 'ERROR', errorData: null });
	}, []);

	return {
		isLoading: httpState.loading,
		data: httpState.data,
		error: httpState.error,
		sendRequest,
		clearError,
	};
};

export default useHttp;
