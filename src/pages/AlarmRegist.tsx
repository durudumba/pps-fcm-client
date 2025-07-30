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

function AlarmRegist() {
    const [loading, setLoading] = useState(false);
    const [permission, setPermiss] = useState('denied');
    const [userName, setUserName] = useState("");
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    // 현재 알림 권한 허용확인
    function handleAllowNotification() {
        Notification.requestPermission()
            .then(permission => {
                setPermiss(permission)
            });
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

        if(!token || token == '') {
            alert("토큰 정보가 없습니다");
            return ;
        }

        if (permission === "granted") {
            setLoading(true);
            console.log("토큰 저장: ",token);

            const param = {
                userName,
                fcmToken: token
            }

            AxiosCall("POST", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/token`, param, (data) => {
                setLoading(false);
                alert("알림 등록 성공");
            }, (err: any) => {
                setLoading(false);
                errorHandler(err);
                return ;
            });
        } else if (permission === "denied") {
            alert("알림 권한이 거부되었습니다. 설정에서 허용해주세요.");
        } else {
            alert("알림 권한을 요청합니다");
            handleAllowNotification();
        }
    }

    const deleteRegistry = async () => {
        console.log("토큰 삭제: ",token);

        const param = {
            fcmToken : token
        }

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
        navigate(pagePaths.history.path);
    }

    useEffect(() => {
        handleAllowNotification();
        getDeviceToken((currentToken: string) =>
            setToken(currentToken)
        )
    }, []);

    if (loading) {
        return (<MainLoading/>)
    }

    return (
        <div className="wrap">
            <div className="contents">
                <h1 className="title">나라장터 입찰공고 알람 서비스</h1>
                <dl className="alarmbox">
                    <dt>알람 수신 설정</dt>
                    <div>개발 중인 기능</div>
                    {/*<dd>*/}
                    {/*    <label><input type="checkbox"/> BIS , ITS</label>*/}
                    {/*    <label><input type="checkbox"/> 전기공사</label>*/}
                    {/*</dd>*/}
                </dl>
                <input type="text" placeholder="사용자 이름 입력" className="name" id="userName" value={userName} onChange={onChagneUserName}/>
                <button className="mainbtn" onClick={onClickRegistry}>등록</button>
                <button className="mainbtn" onClick={deleteRegistry}>삭제</button>
                <button className="mainbtn" onClick={onClickHistory}>이력조회</button>
                <button className="mainbtn" onClick={() => {
                    const param = { fcmToken: token};

                    AxiosCall("POST", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/sendTestPush`, param, (data) => {

                    }, (err: any) => {
                        errorHandler(err);
                    })
                }}>테스트</button>
            </div>

        </div>
    )

}

export default AlarmRegist;
