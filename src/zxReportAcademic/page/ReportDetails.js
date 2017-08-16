import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

class ReportDetails extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount(prevProps, prevState) {
        this.handleScroll();
    }

    componentDidUpdate(prevProps, prevState) {
        $('.zx-report-container-wrapper').mCustomScrollbar('destroy');
        this.handleScroll();
    }

    handleScroll() {
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

                    // Get the id of the current element
                    currentItem = currentItem[currentItem.length-1];
                    let id = currentItem && currentItem.length ? currentItem[0].id : "";

                    if (lastId !== id) {
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

                let accessToken = this.props.accessToken;
                let testId = this.props.testId;
                let sectionID = section.id;
                let sectionTitle = section.title;
                let sectionData = section.data;
                let sectionOptions = section.options;

                return (
                    <SectionComponent
                        key={index}
                        accessToken={accessToken}
                        testId={testId}
                        id={sectionID}
                        title={sectionTitle}
                        data={sectionData}
                        options={sectionOptions}
                    />
                )
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