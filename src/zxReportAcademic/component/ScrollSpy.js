import React from "react";
import $ from 'jquery';

export default class ScrollSpy extends React.Component {
    handleScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        let targetId = '#' + $(e.target).attr('data-target');
        $('.zx-report-container-wrapper').mCustomScrollbar('scrollTo',$('.zx-report-container-wrapper').find('.mCSB_container').find(targetId));
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
            <ul className="section table-of-contents zx-scrollspy">
                {contentScrollItems}
            </ul>
        )
    }
}