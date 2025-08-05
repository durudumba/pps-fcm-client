import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import { Messaging }  from "../settingFCM";
import {AxiosCall, errorHandler, getDeviceToken} from '../comm/common';
import { MainLoading } from '../comm/Loading';
import {pagePaths} from "../comm/pagePaths";
import {useNavigate} from "react-router-dom";

const { REACT_APP_VAPID_KEY,
      REACT_APP_NOTIFICATION_TOKEN_DOMAIN
 } = process.env;

const initKeywordMap = {
    "BIS" : false,
    "ITS" : false,
    "버스정보" : false,
    "교통정보" : false,
    "전기" : false
}

function AlarmRegist() {
    const [loading, setLoading] = useState(false);
    const [permission, setPermiss] = useState('denied');
    const [userName, setUserName] = useState("");
    const [token, setToken] = useState("");

    const [keywordMap, setKeywordMap] = useState(initKeywordMap);

    const navigate = useNavigate();

    // 현재 알림 권한 허용확인
    function handleAllowNotification(callback?: (permission: string) => void) {
        Notification.requestPermission()
            .then(permission => {
                setPermiss(permission)
                callback && callback(permission);
            });
    }

    const checkNotificationPermission = () => {
        if(permission === 'granted') {
            return true;
        } else {
            alert('알림 권한이 거부되었습니다. 설정에서 허용해주세요.');
            return false;
        }
    }

    const onChagneUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        setUserName(value);
    }

    const onClickRegistry = () => {
        if (!String(userName)) {
            alert("사용자명을 입력하세요");
            return;
        }

        if(checkNotificationPermission()) {
            if(!token || token == '') {
                alert("토큰 정보가 없습니다. 새로고침 후 등록해주세요");
                return ;
            }

            const param = {
                userName,
                fcmToken: token,
                srchKeyword: Object.keys(keywordMap).filter((keyword: string) => keywordMap[keyword as keyof object]).join(",")
            }

            setLoading(true);
            AxiosCall("POST", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/saveToken`, param, (data) => {
                setLoading(false);
                alert("알림 등록 성공");
            }, (err: any) => {
                setLoading(false);
                errorHandler(err);
                return ;
            });
        } else {
            if(permission !== 'denied') {
                alert("알림 권한을 요청합니다");
                handleAllowNotification();
            }
        }

    }

    const deleteRegistry = async () => {
        if(!checkNotificationPermission()) return;

        const param = {
            fcmToken : token
        }

        setLoading(true);
        AxiosCall("POST", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/deleteToken`, param, (data) => {
            setLoading(false);
            alert("알림 삭제 성공");
        }, (err: any) => {
            setLoading(false);
            errorHandler(err);
            return ;
        });
    }

    const onClickHistory = () => {
        if(!checkNotificationPermission()) return;

        navigate(pagePaths.history.path);
    }

    const onClickTest = () => {
        if(!checkNotificationPermission()) return;

        const param = {
            fcmToken: token
        };

        setLoading(true);
        AxiosCall("POST", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/sendTestPush`, param, (data) => {
            setLoading(false);
            alert("테스트 알림 전송성공")
        }, (err: any) => {
            setLoading(false);
            errorHandler(err);
        })
    }

    const onClickKeywordBox = (e: any) => {
        const newKeywordMap = {...keywordMap, [e.target.id as keyof object]: e.target.checked};
        const param = {
            fcmToken : token,
            srchKeyword: Object.keys(newKeywordMap).filter((keyword: string) => newKeywordMap[keyword as keyof object]).join(",")
        }

        AxiosCall("POST", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/modSearchKeyword`, param, (data) => {
            setKeywordMap(newKeywordMap);
        }, (err: any) => {
            errorHandler(err);
        });
    }

    useEffect(() => {
        handleAllowNotification((permission: string) => {
            if(permission === 'granted') {
                getDeviceToken((currentToken: string) => {
                    setToken(currentToken);

                    const param = {
                        fcmToken: currentToken
                    }

                    AxiosCall("GET", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/getSearchKeyword`, param, (data) => {
                        let tempKeywordMap: typeof initKeywordMap = initKeywordMap;

                        data.split(",").forEach((kw: string) => {
                            tempKeywordMap = {...tempKeywordMap, [kw as keyof object]: true};
                        })

                        setKeywordMap(tempKeywordMap);
                    }, (err: any) => {
                        errorHandler(err);
                    });
                })
            }
        });
    }, []);

    return (
        <div className="wrap">
            <div className="contents">
                <h1 className="title">나라장터 입찰공고 알람 서비스</h1>
                <dl className="alarmbox">
                    <dt>알람 수신 설정</dt>
                    <dd>
                        {
                            Object.keys(keywordMap).map((keyword: string) => {
                                if(!String(keyword)) return ;
                                return (
                                    <label key={keyword}><input type={"checkbox"} id={keyword} onChange={onClickKeywordBox} checked={keywordMap[keyword as keyof object]}/>&nbsp;{keyword}</label>
                                )
                            })
                        }
                    </dd>

                </dl>
                <input type="text" placeholder="사용자 이름 입력" className="name" id="userName" value={userName} onChange={onChagneUserName}/>
                <button className="mainbtn" onClick={onClickRegistry}>등록</button>
                <button className="mainbtn" onClick={deleteRegistry}>삭제</button>
                <button className="mainbtn" onClick={onClickHistory}>이력조회</button>
                <button className="mainbtn" onClick={onClickTest}>알림 테스트</button>
            </div>
            <MainLoading show={loading}/>
        </div>
    )

}

export default AlarmRegist;
