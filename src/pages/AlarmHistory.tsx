import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {AxiosCall, errorHandler, getDeviceToken, TimeFormatter} from "../comm/common";
import {MainLoading} from "../comm/Loading";
import {pagePaths} from "../comm/pagePaths";
import BidNtceDetail from "./BidNtceDetail";

const {REACT_APP_NOTIFICATION_TOKEN_DOMAIN} = process.env;

interface HistDataType {
    bidNtceId: string,
    bidNtceNm: string,
    inqryYn: string,
    rgstDt: string,
    sendDt: string,
    sendFcmToken: string
}

function AlarmHistory() {
    const [loading, setLoading] = useState(false);
    const [histData, setHistData] = useState<Array<HistDataType>>([]);
    const [selBidNtceId, setSelBidNtceid] = useState("");
    const [detlOpen, setDetlOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        getDeviceToken((currentToken: string) => {
            const param = {
                fcmToken: currentToken
            }

            AxiosCall("POST", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/validFcmToken`, param, (data) => {
                setLoading(false);
                if(data) {
                    AxiosCall("POST", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/history/getSendMsgHistory`, param, (data: Array<HistDataType>) => {
                        setLoading(false);
                        setHistData(data);
                    }, (err: any) => {
                        setLoading(false);
                        errorHandler(err);
                    });
                } else {
                    alert("등록되지 않은 토큰입니다");
                    navigate(pagePaths.regist.path);
                }
            }, (err: any) => {
                alert("토큰 검증 오류 발생");
                navigate(pagePaths.regist.path);
            });


        })
    }, []);

    if(loading) return (<MainLoading/>)

    return (
        <>
            <div className="wrap2">
                <article>
                    <div className={"detailheader"}>
                        <button onClick={()=>{navigate("/")}}>&lt; 알람설정</button>
                    </div>
                    <h2>알람수신 이력</h2>
                    <div className="listbox">
                        <table>
                            <thead>
                            <tr>
                                <th>공고번호</th>
                                <th>공고명</th>
                                <th>게시일</th>
                                <th>전송일자</th>
                                <th>확인여부</th>
                            </tr>
                            </thead>
                            <tbody>
                            {histData.map((data, index) => {
                                const onClick = () => {
                                    setSelBidNtceid(data.bidNtceId);
                                    setDetlOpen(true);
                                }
                                return (
                                    <tr onClick={onClick} key={data.bidNtceId + '_' + index}>
                                        <td>{data.bidNtceId}</td>
                                        <td>{data.bidNtceNm}</td>
                                        <td>{TimeFormatter(data.rgstDt)}</td>
                                        <td>{TimeFormatter(data.sendDt)}</td>
                                        <td>{data.inqryYn}</td>
                                    </tr>
                                )
                            })
                            }
                            </tbody>
                        </table>
                    </div>
                </article>
            </div>
            {detlOpen
                ? <BidNtceDetail isOpen={detlOpen} setIsOpen={setDetlOpen} bidNtceId={selBidNtceId}/>
                : null
            }

        </>
    );
}

export default AlarmHistory;