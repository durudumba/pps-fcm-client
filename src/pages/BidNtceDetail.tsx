import {useEffect, useState} from "react";
import {AxiosCall, TimeFormatter} from "../comm/common";
import {MainLoading} from "../comm/Loading";

const {REACT_APP_NOTIFICATION_TOKEN_DOMAIN} = process.env;

interface BidNtceDetlType {
    ntceKindNm: string,
    rgstDt: string,
    bidNtceId: string,
    bidNtceNm: string,
    ntceInsttNm: string,
    bidMethdNm: string,
    cntrctCnclsMthdNm: string,
    sucsfbidMthdNm: string,
    ntceSpecFileNm1: string,
    ntceSpecDocUrl1: string,
    ntceSpecFileNm2: string,
    ntceSpecDocUrl2: string,
    ntceSpecFileNm3: string,
    ntceSpecDocUrl3: string,
    ntceSpecFileNm4: string,
    ntceSpecDocUrl4: string,
    ntceSpecFileNm5: string,
    ntceSpecDocUrl5: string,
    ntceSpecFileNm6: string,
    ntceSpecDocUrl6: string,
    ntceSpecFileNm7: string,
    ntceSpecDocUrl7: string,
    ntceSpecFileNm8: string,
    ntceSpecDocUrl8: string,
    ntceSpecFileNm9: string,
    ntceSpecDocUrl9: string,
    ntceSpecFileNm10: string,
    ntceSpecDocUrl10: string
}

const initBidNtceDetl: BidNtceDetlType = {
    ntceKindNm: "",
    rgstDt: "",
    bidNtceId: "",
    bidNtceNm: "",
    ntceInsttNm: "",
    bidMethdNm: "",
    cntrctCnclsMthdNm: "",
    sucsfbidMthdNm: "",
    ntceSpecFileNm1: "",
    ntceSpecDocUrl1: "",
    ntceSpecFileNm2: "",
    ntceSpecDocUrl2: "",
    ntceSpecFileNm3: "",
    ntceSpecDocUrl3: "",
    ntceSpecFileNm4: "",
    ntceSpecDocUrl4: "",
    ntceSpecFileNm5: "",
    ntceSpecDocUrl5: "",
    ntceSpecFileNm6: "",
    ntceSpecDocUrl6: "",
    ntceSpecFileNm7: "",
    ntceSpecDocUrl7: "",
    ntceSpecFileNm8: "",
    ntceSpecDocUrl8: "",
    ntceSpecFileNm9: "",
    ntceSpecDocUrl9: "",
    ntceSpecFileNm10: "",
    ntceSpecDocUrl10: ""
}

function BidNtceDetail(props: {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    bidNtceId: string
}) {
    const [data, setData] = useState<BidNtceDetlType>(initBidNtceDetl);

    const closePage = (e: any) => {
        props.setIsOpen(false);
    }

    useEffect(() => {

        if(!props.bidNtceId || props.bidNtceId =='') return ;
        console.log(props.bidNtceId);

        const param = {
            bidNtceId : props.bidNtceId
        }

        AxiosCall("GET", `${REACT_APP_NOTIFICATION_TOKEN_DOMAIN}/api/notification/getBidNtceDetl`, param, (data) => {
            setData(data);
            console.log(data);
        }, (err: any) => {
            console.log(err);
            alert("공고 정보 조회 오류 발생");
        })
    }, [props.bidNtceId]);


    return (
        <div className="wrap2" hidden={!props.isOpen}>
            <article>
                <div className={"detailheader"}>
                    <button onClick={closePage}>&lt; 수신목록</button>
                </div>
                <h2>공고내용</h2>

                <div className="listcon">
                    <table>
                        <tbody>
                        <tr>
                            <th>공고종류</th>
                            <td>{data.ntceKindNm}</td>
                            <th>게시일시</th>
                            <td>{TimeFormatter(data.rgstDt)}</td>
                        </tr>
                        <tr>
                            <th>입찰공고번호</th>
                            <td>{data.bidNtceId}</td>
                            <th>채권자명</th>
                            <td>{data.ntceInsttNm}</td>
                        </tr>
                        <tr>
                            <th>공고명</th>
                            <td colSpan={3}>{data.bidNtceNm}</td>
                        </tr>
                        <tr>
                            <th>입찰방식</th>
                            <td>{data.bidMethdNm}</td>
                            <th>낙찰방법</th>
                            <td>{data.sucsfbidMthdNm}</td>
                        </tr>
                        <tr>
                            <th>계약방법</th>
                            <td colSpan={3}>{data.cntrctCnclsMthdNm}</td>
                        </tr>
                        <tr>
                            <th>첨부파일1</th>
                            <td><a href={data.ntceSpecDocUrl1} target={"_blank"} rel={"noreferrer"}>{data.ntceSpecFileNm1}</a></td>
                            <th>첨부파일2</th>
                            <td><a href={data.ntceSpecDocUrl2} target={"_blank"} rel={"noreferrer"}>{data.ntceSpecFileNm2}</a></td>
                        </tr>
                        <tr>
                            <th>첨부파일3</th>
                            <td><a href={data.ntceSpecDocUrl3} target={"_blank"} rel={"noreferrer"}>{data.ntceSpecFileNm3}</a></td>
                            <th>첨부파일4</th>
                            <td><a href={data.ntceSpecDocUrl4} target={"_blank"} rel={"noreferrer"}>{data.ntceSpecFileNm4}</a></td>
                        </tr>
                        <tr>
                            <th>첨부파일5</th>
                            <td><a href={data.ntceSpecDocUrl5} target={"_blank"} rel={"noreferrer"}>{data.ntceSpecFileNm5}</a></td>
                            <th>첨부파일6</th>
                            <td><a href={data.ntceSpecDocUrl6} target={"_blank"} rel={"noreferrer"}>{data.ntceSpecFileNm6}</a></td>
                        </tr>
                        <tr>
                            <th>첨부파일7</th>
                            <td><a href={data.ntceSpecDocUrl7} target={"_blank"} rel={"noreferrer"}>{data.ntceSpecFileNm7}</a></td>
                            <th>첨부파일8</th>
                            <td><a href={data.ntceSpecDocUrl8} target={"_blank"} rel={"noreferrer"}>{data.ntceSpecFileNm8}</a></td>
                        </tr>
                        <tr>
                            <th>첨부파일9</th>
                            <td><a href={data.ntceSpecDocUrl9} target={"_blank"} rel={"noreferrer"}>{data.ntceSpecFileNm9}</a></td>
                            <th>첨부파일10</th>
                            <td><a href={data.ntceSpecDocUrl10} target={"_blank"} rel={"noreferrer"}>{data.ntceSpecFileNm10}</a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    )
}

export default BidNtceDetail;