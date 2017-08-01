import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import {SectionReportTitle} from '../section2/SectionReportTitle';
import {SectionReportBasicInfo} from '../section2/SectionReportBasicInfo';
import {SectionReportScore} from '../section2/SectionReportScore';
import {SectionChildBasic} from '../section2/SectionChildBasic';
import {SectionReportStandardLevel} from '../section2/SectionReportStandardLevel';
import {SectionChildIndicatorsLvOne} from '../section2/SectionChildIndicatorsLvOne';
import {SectionWrongQuize} from '../section2/SectionWrongQuize';

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

// let config = require('zx-const')[process.env.NODE_ENV];

class ReportDetails extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidUpdate() {
        let lastId;
        let scrollSpyItems = $('.zx-scrollspy').find('a');
        let scrollSpyTargets = scrollSpyItems.map(function(index, item){
            let target = $('#'+ $(item).attr("data-target"));
            if (target.length) { return target; }
        });
        $('.zx-report-container-wrapper').mCustomScrollbar({
            theme: 'minimal-dark',
            scrollInertia: 400,
            mouseWheel:{ scrollAmount: 200 },
            callbacks:{
                whileScrolling: function(){
                    // Get container scroll position
                    let fromTop = (this.mcs.top < 0) ? (this.mcs.top * -1) : this.mcs.top;

                    // Get id of current scroll item
                    let currentItem = scrollSpyTargets.map(function(index, target){
                        let offsetTop = $(target).offset().top;
                        let height = $(target).height();
                        if (offsetTop <= 0 && (offsetTop*-1) < height)
                            return target;
                    });
                    console.log(currentItem);

                    // Get the id of the current element
                    currentItem = currentItem[currentItem.length-1];
                    let id = currentItem && currentItem.length ? currentItem[0].id : "";

                    if (lastId !== id) {
                        console.log('lastId', lastId);
                        console.log('id', id);
                        //console.log(scrollSpyItems.filter("[data-target='"+id+"']"));
                        scrollSpyItems.removeClass("active");
                        scrollSpyItems.filter("[data-target='"+id+"']").addClass("active");
                    }
                }
            }
        });
    }

    render() {
        let reportData = this.props.reportData;
        let contentSection, contentScrollSpy;
        if (reportData) {
            contentSection = reportData.map((section, index) => {
                let SectionComponent = section.component;

                let sectionID = section.id;
                let sectionTitle = section.title;
                let sectionData = section.data;
                let sectionOptions = section.options;

                return <SectionComponent key={index} id={sectionID} title={sectionTitle} data={sectionData} options={sectionOptions} />
            });
        }
        return (
            <div className="zx-report-container-wrapper slideUp">
                <div className="zx-report-container-box">
                    <div className="zx-report-container">
                        {contentSection}
                    </div>
                </div>
            </div>
        )

    }
}

export default ReportDetails;