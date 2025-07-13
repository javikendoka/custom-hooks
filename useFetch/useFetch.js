import React, { useEffect, useState } from 'react'

const localCache = {

}

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        errorMsg: null,
    });

    useEffect(() => {
        getFetch();
    }, [url])

    const setLoadingInit = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            errorMsg: null,
        });
    }

    const getFetch = async () => {

        if (localCache[url]) {
            setState({
                data: localCache[url],
                isLoading: false,
                code: null,
                hasError: false,
                errorMsg: null
            });
            return;
        }

        setLoadingInit();

        const resp = await fetch(url);

        await new Promise( resolve => setTimeout(resolve, 500))

        if ( !resp.ok ) {
            // console.log("ERROR", resp)
            setState({
                data: null,
                isLoading: false,
                code: resp.status,
                hasError: true,
                errorMsg: resp.statusText || resp.status + ' - Error al recuperar pokemon'
            });
            return;
        }
        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            code: resp.status,
            hasError: false,
            errorMsg: null
        });

        localCache[url] = data;

        console.log(data);
    }

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    errorMsg: state.errorMsg,
    code: state.code
  }
}
