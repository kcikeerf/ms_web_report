import React from "react";
import $ from 'jquery';

export default class ScrollSpy extends React.Component {
    handleScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        let targetId = '#' + $(e.target).attr('data-target');
        let scrollContainer = '.zx-report-container-wrapper';
        $(scrollContainer).mCustomScrollbar('scrollTo',$(scrollContainer).find('.mCSB_container').find(targetId));
    }
    componentDidMount(){
        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
        });
    }
    componentDidUpdate(){
        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
        });
    }
    render() {
        let data = this.props.data;
        let contentScrollItems;
        contentScrollItems = data.map((dataItem, index) => {
            return (

                <li key={index}>

                    <a
                        className="tooltipped"
                        data-position="left"
                        data-tooltip={dataItem.title}
                        data-target={dataItem.target}
                        onClick={this.handleScroll.bind(this)}
                    >
                        <span>{index+1}.</span>
                        {dataItem.title}
                    </a>
                </li>);
        });
        return (
            <ul className="section table-of-contents z-depth-2 zx-scrollspy">
                {contentScrollItems}
            </ul>
        )
    }
}