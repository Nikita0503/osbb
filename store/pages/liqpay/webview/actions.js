export const WEBVIEW_LOADING = 'WEBVIEW_LOADING';
export const WEBVIEW_DATA = 'WEBVIEW_DATA';
export const WEBVIEW_SIGNATURE = 'WEBVIEW_SIGNATURE';

export const setLoading = loading => ({
    type: WEBVIEW_LOADING,
    payload: loading
});

export const setData = data => ({
    type: WEBVIEW_DATA,
    payload: data
});

export const setSignature = signature => ({
    type: WEBVIEW_SIGNATURE,
    payload: signature
});

export const sendPaymentRequest = (formBody) => {
    return async dispatch => {
        try{
            const paymentRequestPromise = await fetch('https://www.liqpay.ua/apiweb/sandbox/get_data_signature', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: formBody,
            })
  
            const paymentRequest = await paymentRequestPromise.json();
            dispatch(setData(paymentRequest.data))
            dispatch(setSignature(paymentRequest.signature))
        } catch (error) {
            console.log("sendPaymentRequest", error)
        }
    }
}