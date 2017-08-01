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

    render() {
        let data = this.props.data;
        let contentScrollItems;
        contentScrollItems = data.map((dataItem, index) => {
            return (
                <li>
                    <a
                        className=""
                        data-target={dataItem.target}
                        onClick={this.handleScroll.bind(this)}
                    >
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