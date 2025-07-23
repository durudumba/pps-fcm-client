
import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import './App.css';
import { Messaging }  from "./settingFCM";
import { AxiosCall } from './comm/common';
import { MainLoading } from './comm/Loading';

const { REACT_APP_VAPID_KEY,
      REACT_APP_NOTIFICATION_TOKEN_DOMAIN
 } = process.env;

function AppRoot() {
    const [ loading, setLoading ] = useState(false);
    const [ permission, setPermiss] = useState('denied');
    const [ userName, setUserName ] = useState("");

    // 현재 알림 권한 허용확인
    function handleAllowNotification() {
        Notification.requestPermission()
            .then(permission => { setPermiss(permission) });
    }

    async function getDeviceToken() {
        await getToken(Messaging, {vapidKey: `${REACT_APP_VAPID_KEY}`})
            .then((currentToken) => {
                if (currentToken) {
                    console.log("토큰: ", currentToken);
                    
                    const param = {
                        userName,
                        fcmToken : currentToken
                    }
                    
                    AxiosCall("POST", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/token`, param, (data) => {
                        setLoading(false);
                        alert("알림 등록 성공");
                    }, (err: any) => {
                        setLoading(false);
                        alert("알림 등록 오류");
                    });

                } else {
                alert("토큰을 가져오지 못했습니다. 권한을 다시 요청하세요.");
                }
            })
            .catch((err) => {
                setLoading(false);
                alert("토큰을 가져오는 중 에러 발생: " + err);
            });
    }

    useEffect(() => {
        handleAllowNotification();
    },[]);

    const onChagneUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        setUserName(value);
    }

    const onClickRegistry = () => {
        if(!String(userName)) {
            alert("사용자명을 입력하세요");
            return ;
        }

        if(permission === "granted") {
            setLoading(true);
            getDeviceToken();
        } else if(permission === "denied") {
            alert("알림 권한이 거부되었습니다. 설정에서 허용해주세요.");
        } else {
            alert("알림 권한을 요청합니다");
            handleAllowNotification();
        }
    }

    if(loading) {
        return ( <MainLoading/> )
    }
  
    return (
        <div className="App">
            <div className={"title"}>
                <label>나라장터 입찰공고 서비스</label>
            </div>
            <div className="content_Wrapper">
                <div className={"input_userName"}>
                    <input id={"userName"} value={userName} onChange={onChagneUserName} placeholder={"사용자명 입력"}/>
                </div>

                <div className={"setting_alert"}>
                    <button onClick={onClickRegistry} className={"main_btn"}>등록</button>
                    {/*<button>삭제</button>*/}
                </div>
            </div>
        </div>
    )

}

export default AppRoot;
