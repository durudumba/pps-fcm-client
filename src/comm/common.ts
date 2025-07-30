import axios     from "axios";
import {getToken} from "firebase/messaging";
import {Messaging} from "../settingFCM";

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
        if (response.data != null) {
            _callbackFunction && _callbackFunction(response.data);
        }
    }).catch(error => {
        if(error?.response?.status === 401) {
            return;
        } else {
            _errorCallback && _errorCallback(error);
        }
    });
}

export async function getDeviceToken(callback: ((currentToken: string) => void)) {
    const {REACT_APP_VAPID_KEY} = process.env;

    await getToken(Messaging, {vapidKey: `${REACT_APP_VAPID_KEY}`})
        .then((currentToken: string) => {
            if(currentToken) callback(currentToken);
             else alert("토큰을 가져오지 못했습니다. 권한을 다시 요청하세요.");
        })
        .catch((err) => {
            alert("토큰을 가져오는 중 에러 발생: " + err);
        });
}

export function errorHandler(error: any) {
    console.log(error);
    if(error?.response?.status === 500) {
        alert(error?.response?.data);
    } else {
        alert("미확인 오류발생");
    }
}

export function TimeFormatter(stringTime: string) {
    if(stringTime.length!=14) return stringTime;

    return stringTime.slice(0,4)+'-'+stringTime.slice(4,6)+'-'+stringTime.slice(6,8)+" "
    +stringTime.slice(8,10)+":"+stringTime.slice(10,12)+":"+stringTime.slice(12);
}


