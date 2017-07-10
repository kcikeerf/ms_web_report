import React from "react";

export default class Preloader extends React.Component {
    render() {
        return (
            <div className="zx-preloader-container">
                <div className="zx-preloader-wrapper">
                    <div className="zx-preloader"></div>
                    {/*
                     <div className="zx-preloader-text">加载中...</div>
                    */}
                    <div className="loader-section"></div>
                </div>
            </div>
        )
    }
}