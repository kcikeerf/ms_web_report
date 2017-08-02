import React, {Component} from 'react';
import {Map, is} from 'immutable';
import $ from 'jquery';

import TableDefault from '../component/TableDefault';
// let config = require('zx-const')[process.env.NODE_ENV];

//下一级一级指标的block
export class SectionChildIndicatorsLvOne extends Component {

    constructor() {
        super();
        this.state = {
            index: 0
        };
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     let propsMap = Map(this.props);
    //     let nextPropsMap = Map(nextProps);
    //     return !is(propsMap, nextPropsMap);
    // }

    componentDidMount(e) {
        $(this.refs[0]).addClass("zx-li-add-style");
    }

    handleItem(e) {
        let index = $(e.target)[0].id;
        this.setState({
            index: index
        });
        $(e.target).addClass("zx-li-add-style");
        $(e.target).siblings().removeClass("zx-li-add-style");
    }

    render() {
        let id = this.props.id;
        let title = this.props.title;
        let data = this.props.data;
        let options = this.props.options;
        data = [data[this.state.index]];
        let contentTableDefault, items;
        //学校基本信息表格
        if (data) {
            contentTableDefault = data.map((item, index) => {
                let tableData = {
                    tHeader: item.data.tHead,
                    tData: item.data.tData
                };
                return (
                    <div key={index}>
                        <TableDefault key={index} data={tableData}/>
                    </div>
                )
            });

            items = options.map((item, index) => {
                return <li onClick={this.handleItem.bind(this)} key={index} id={index} ref={index} className="zx-li-style">{item}</li>
            });
        }

        return (
            <div id={id} className="zx-section-container">
                <div className="col s12">
                    <div className="section">
                        <h2>{title}</h2>
                        <ul className="zx-ul-style">
                            {items}
                        </ul>
                        {contentTableDefault}
                    </div>
                    <div className="divider"></div>
                </div>
            </div>
        )
    }
}
