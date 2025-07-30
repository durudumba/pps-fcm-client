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
    const [token, setToken] = useState("");
    const [detlOpen, setDetlOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        setLoading(true);
        getDeviceToken((currentToken: string) => {
            setToken(currentToken);

            const param = {
                fcmToken: currentToken
            }
            AxiosCall("POST", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/getSendMsgHistory`, param, (data: Array<HistDataType>) => {
                setLoading(false);
                setHistData(data);
            }, (err: any) => {
                setLoading(false);
                errorHandler(err);
                navigate(pagePaths.regist.path);
            });
        })
    }, [detlOpen]);

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
                                <th>조회여부</th>
                                <th>공고번호</th>
                                <th>공고명</th>
                                <th>게시일</th>
                                <th>전송일자</th>
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
                                        <td style={{fontWeight:data.inqryYn==='Y'?"normal":"bold"}}>{data.inqryYn === 'Y' ? "확인" : "미확인"}</td>
                                        <td style={{fontWeight:data.inqryYn==='Y'?"normal":"bold"}}>{data.bidNtceId}</td>
                                        <td style={{fontWeight:data.inqryYn==='Y'?"normal":"bold"}}>{data.bidNtceNm}</td>
                                        <td style={{fontWeight:data.inqryYn==='Y'?"normal":"bold"}}>{TimeFormatter(data.rgstDt)}</td>
                                        <td style={{fontWeight:data.inqryYn==='Y'?"normal":"bold"}}>{TimeFormatter(data.sendDt)}</td>
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
                ? <BidNtceDetail isOpen={detlOpen} setIsOpen={setDetlOpen} bidNtceId={selBidNtceId} fcmToken={token}/>
                : null
            }

            <MainLoading show={loading}/>
        </>
    );
}

export default AlarmHistory;