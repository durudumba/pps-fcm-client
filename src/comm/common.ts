import axios     from "axios";

export async function AxiosCall(requsetType : any, url : string, data : any, _callbackFunction : (data : any) => void ,  _errorCallback : any ) {
    
    const options = {
        url: url,
        method: requsetType,
        params: data,
        headers: {
             "Content-Type": "application/json",
        },
        error : (data : any) => {
            console.log(data);
        }
    }
    
    await axios(options).then(response => {
        if ( response.status !== 200 ) {
            alert("에러가 발생했습니다.");
            return;
        }

        if (response.data != null) {
            _callbackFunction && _callbackFunction(response.data);
        }
    });
}

