import {useState} from "react";

export const MainLoading = (props: {show: boolean}) => {

    return (
        <>
        <div className='mainLoadingContent' hidden={!props.show}>
            <div className='mainLoading'>Loading...</div>
            <div className="loader">
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
            </div>
        </div>
        </>
    )
}
