import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import Preloader from './Preloader';

let config = require('zx-const')[process.env.NODE_ENV];

export default class TableIndicator extends React.Component {

    constructor() {
        super();
        this.state = {
            activeId: null,
            quizsDetailResponse: null,      //试题详情
            relatedQuizsResponse: null,     //推题
            getPaperQuizCkpsResponse: null, //试题列表
            checkPointUid: null             //得分点Uid
        }
    }

    handleQuizsDetails(e) {
        e.preventDefault();
        e.stopPropagation();

        let target = $(e.target).parents('tr');
        let indicatorID = target.attr('data-id');
        this.setState({
            activeId: indicatorID
        });

        let modalID = '#' + this.props.data.option.modalId;
        $(modalID).modal('open');
    }

    // 试题详情
    handleQuizsDetailResponse(response) {
        this.setState({
            quizsDetailResponse: response
        });

        let modalID = '#' + this.props.data.option.modalId;

        // 关闭列表
        $(modalID).modal('close');

        // 打开试题详情
        $(`${modalID}-Deatil`).modal('open');
    }

    // 推题
    handleRelatedQuizsResponse(response) {
        this.setState({
            relatedQuizsResponse: response
        });
    }

    // 试题列表
    handleList(checkPointUid, e) {
        let modalID = '#' + this.props.data.option.modalId;
        this.setState({
            activeId: checkPointUid
        });
        $(`${modalID}-Deatil`).modal('close');
        $(modalID).modal('open');

        let selecedAccessToken = getCookie(config.COOKIE.SELECTED_ACCESS_TOKEN);

        //指标获取试题列表
        this.handleGetPaperQuizCkps(selecedAccessToken, checkPointUid);
    }

    //指标获取试题列表
    handleGetPaperQuizCkps(selecedAccessToken, checkPointUid) {
        let data = this.props.data;
        let testId = data.data.testId;

        let getPaperQuizCkpsApi = config.API_DOMAIN + config.API_GET_PAPER_QUIZ_CKPS;
        let relatedQuizsData = {
            access_token: selecedAccessToken,
            ckp_uid: checkPointUid,
            test_uid: testId
        };

        let getPaperQuizCkpsPromise = $.post(getPaperQuizCkpsApi, relatedQuizsData);
        getPaperQuizCkpsPromise.done(function (response) {
            if (response.qzps.length !== 0) {
                this.setState({
                    getPaperQuizCkpsResponse: response
                });
            }
        }.bind(this));
        getPaperQuizCkpsPromise.fail(function (errorResponse) {
            console.log(errorResponse);
        }.bind(this));

    }

    handleDetailClose() {
        let data = this.props.data;
        let modalId = data.option.modalId;

        $(`#${modalId}-Deatil`).modal('close');
    }

    render() {
        let selecedAccessToken = getCookie(config.COOKIE.SELECTED_ACCESS_TOKEN);

        let data = this.props.data;
        let testId = data.data.testId;
        let modalId = data.option.modalId;
        let tHeader = data.data.tHeader;
        let tData = data.data.tData;
        let tAction = data.data.tAction;
        let testSubject = this.props.options.testSubject;
        let testGrade = this.props.options.testGrade;
        let extData = this.props.options.extData;

        let contentTHeader = tHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
        });

        let contentTData = tData.map((data, index) => {
            let td = [];
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    let content = data[property];
                    if (property === '0') {
                        //注释的是指标推送题方法 同116行
                        content = <a href="javascript:;">{content}</a>
                        // content = <span>{content}</span>
                    }
                    td.push(<td key={property}>{content}</td>);
                }
            }
            return <tr key={index} data-id={tAction[index]} onClick={this.handleQuizsDetails.bind(this)}>{td}</tr>
        });

        return (
            <div className="zx-indicator-table-container">
                <table className="highlight zx-table-default">
                    <thead>
                    <tr>
                        {contentTHeader}
                    </tr>
                    </thead>

                    <tbody>
                    {contentTData}
                    </tbody>
                </table>
                <Modal
                    id={modalId}
                    handleQuizsDetailResponse={this.handleQuizsDetailResponse.bind(this)}
                    handleRelatedQuizsResponse={this.handleRelatedQuizsResponse.bind(this)}
                    handleList={this.handleList.bind(this, this.state.checkPointUid)}
                    selecedAccessToken={selecedAccessToken}
                    indicatorId={this.state.activeId}
                    originalQuiz={this.state.relatedQuizs}
                    testId={testId}
                    checkPointUid={this.state.checkPointUid}
                    testSubject={testSubject}
                    testGrade={testGrade}
                    extData={extData}
                />
                <DetailModal
                    handleDetailClose={this.handleDetailClose.bind(this)}
                    originalQuiz={this.state.quizsDetailResponse}//详情
                    relatedQuizsResponse={this.state.relatedQuizsResponse}//推题
                    handleList={this.handleList.bind(this)}
                    id={modalId}
                />
            </div>
        )
    }
}


class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            getPaperQuizCkpsResponse: null,
            flag: false,
            response: null
        }
    }

    componentDidMount() {
        $(document).ready(function () {
            $('.zx-modal-related-quiz').modal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 300, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute,
                ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).hide();
                    $('.zx-report-container-wrapper ').mCustomScrollbar('disable');
                }.bind(this),
                complete: function () { // Callback for Modal close
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).show();
                    $('.zx-report-container-wrapper ').mCustomScrollbar('update');
                }
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.indicatorId !== this.props.indicatorId) {
            let selecedAccessToken = nextProps.selecedAccessToken;
            let indicatorId = nextProps.indicatorId;
            this.setState({
                selecedAccessToken: selecedAccessToken,
                getPaperQuizCkpsResponse: null,
            });
            //指标获取试题列表
            this.handleGetPaperQuizCkps(selecedAccessToken, indicatorId);
        }
    }

    //指标获取试题列表
    handleGetPaperQuizCkps(selecedAccessToken, indicatorId) {
        let testId = this.props.testId;
        let getPaperQuizCkpsApi = config.API_DOMAIN + config.API_GET_PAPER_QUIZ_CKPS;
        let relatedQuizsData = {
            access_token: selecedAccessToken,
            ckp_uid: indicatorId,
            test_uid: testId
        };
        let getPaperQuizCkpsPromise = $.post(getPaperQuizCkpsApi, relatedQuizsData);
        getPaperQuizCkpsPromise.done(function (response) {
            if (response.qzps.length !== 0) {
                this.setState({
                    getPaperQuizCkpsResponse: response,
                    flag: true
                });
            }
        }.bind(this));
        getPaperQuizCkpsPromise.fail(function (errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }

    //关闭弹框
    handleClose() {
        let id = this.props.id;
        $(`#${id}`).modal('close');
    }

    render() {
        let id = this.props.id;
        let testId = this.props.testId;
        let indicatorId = this.props.indicatorId;
        let testSubject = this.props.testSubject;
        let testGrade = this.props.testGrade;
        let extData = this.props.extData;
        let selecedAccessToken = this.props.selecedAccessToken;
        let tmpIndicatorIntro = [
            '书面上用于标明句读和语气的符号,用来表示停顿、语气以及词语的性质和作用。分为点号（句号、问好、逗号等）、标号（引号、括号、破折号等）、符号（注释号、斜线号、标识号等）三大类',
            '古诗文句子中，在理解句意的基础上，将句子分解成各个部分，并确定各部分彼此与整体结构或目的关系',
            '一种修辞手法，利用词的多义或同音的条件，有意使语句具有双重意义，言在此而意在彼',
            '通过读的方式，对再次出现的信息能够识别的思维过程',
            '是指对语段或文章的主题、结构、内容、语言的合理性进行客观评价和论证的过程',
            '领会和体验作者透过文本表达的情绪、情感、意图、目的等的能力',
            '发现句子、语段、文章内在逻辑关系或以符合逻辑的关系表述事物的能力',
            '将具有一致性或相关联系的信息、事物、观点或其他类似物匹配起来的能力',
            '点、线、面、角、相交线与平行线、三角形、四边形、圆、尺规作图、定义、命题、定理',
            '概率的意义、事件、频率、列表、画树状图、概率的计算',
            '方程与方程组、不等式与不等式组',
            '将某些事物按其内在性质归属为同一类的思维过程',
            '在新的学习或应用情境中，借鉴过往经验的过程',
            '归纳推理：由个别到一般的推理方法，从两个或几个单称判断或特称判断得出一个全称判断',
            '敏感感知数与数量、数量关系、估算结果等的能力',
            '理解文字说明，并将其转化为数学问题的能力',
            '对数学概念进行准确区分的能力',
            'each other, one another相互代词就是表示相互关系的代词。它与它所指代的名词或代词是一种互指关系，因此它们是复数或者二者以上。英语中的相互代词只有两个，即each other和one another。在正式文体中多用each other指两者，用one another 指两者以上',
            '连系动词，是用来帮助说明主语的动词。它本身有词义，但不能单独用作谓语，其后必须跟表语，构成系表结构说明主语的状况、性质、特征等情况',
            '名词分为可数名词和不可数名词。可数名词有单数和复数之分，这在句子的应用中十分重要，表示两个或者两个以上的数的概念时，该名词就要用复数形式，复数规则变化是在名词词尾加-s或者-es，不规则变化需要特殊记忆'
        ];
        let random = Math.round(Math.random() * (tmpIndicatorIntro.length - 0) + 0);
        let contentRelatedQuizs, contentOriginalQuiz, quizId;
        let data = {
            tData: [],
            tHeader: ['题号', '题类型', '难易程度', '题目'],
            quizId: []
        };
        if (this.state.flag && this.state.getPaperQuizCkpsResponse) {
            this.state.getPaperQuizCkpsResponse.qzps.forEach((quiz, index) => {
                quizId = quiz.uid;
                let tData = [
                    quiz.order,
                    quiz.cat_cn,
                    quiz.levelword,
                    '查看试题详情'
                ];
                data.tData.push(tData);
                data.quizId.push(quizId);
            });

            let contentRelatedQuizs =
                <TableScrollWithSkip
                    handleQuizsDetailResponse={this.props.handleQuizsDetailResponse.bind(this)}
                    handleRelatedQuizsResponse={this.props.handleRelatedQuizsResponse.bind(this)}
                    id={id}
                    data={data}
                    testId={testId}
                    testSubject={testSubject}
                    testGrade={testGrade}
                    extData={extData}
                    indicatorId={indicatorId}
                    selecedAccessToken={selecedAccessToken}
                    handleClose={this.handleClose.bind(this)}
                />;

            contentOriginalQuiz =
                <div className="row">
                    <div className="col s12">
                        <div className="zx-related-quiz-container">
                            {contentRelatedQuizs}
                        </div>
                    </div>
                </div>
        }
        else {
            contentOriginalQuiz =
                <div className="zx-modal-preloader-container">
                    <div className="preloader-wrapper active">
                        <div className="spinner-layer spinner-red-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>;
        }

        return (
            <div id={id} className="modal zx-modal-related-quiz">
                <div className="modal-content">
                    <span className="zx-font-size">原题列表</span>
                    <span className="zx-close" onClick={this.handleClose.bind(this)}>
                        <i className="material-icons zx-font-size">clear</i>
                    </span>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="zx-related-quiz-container">
                            {contentOriginalQuiz}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class TableScrollWithSkip extends React.Component {

    constructor() {
        super();
        this.state = {
            originalQuiz: null,
            relatedQuizs: null
        };
    }

    componentDidMount() {
        $('.zx-table-scroll tbody').mCustomScrollbar({
            theme: 'inset-3-dark',
            scrollInertia: 400,
            mouseWheel: {scrollAmount: 200}
        });
    }

    handleQuizsDetails(quizId, e) {
        let testSubject = this.props.testSubject;
        let testGrade = this.props.testGrade;
        let extData = this.props.extData;
        let indicatorId = this.props.indicatorId;
        let testId = this.props.testId;
        let selecedAccessToken = this.props.selecedAccessToken;
        let quizDetailsApi = config.API_DOMAIN + config.API_QUIZS_DETAILS;
        let quizDetailsData = {
            access_token: selecedAccessToken,
            test_id: testId,
            qzp_id: quizId,
            user_name: null
        };
        let quizCat;
        let quizDetailsPromis = $.post(quizDetailsApi, quizDetailsData);
        quizDetailsPromis.done(function (response) {
            quizCat = response.quiz_cat;
            this.setState({
                originalQuiz: {
                    fullScore: response.full_score,
                    body: response.quiz_body,
                    answer: response.qzp_answer,
                    resultContent: response.result_info.result_answer,
                    quizCat: response.quiz_cat
                }
            });

            this.props.handleQuizsDetailResponse(response);

            //试题推送方法
            //判断 当前为九年级才调用
            // if (testGrade === 'jiu_nian_ji') {
            this.handGetRelatedQuizsPlus(selecedAccessToken, indicatorId, testSubject, testGrade, quizCat, quizId, extData);
            // }

        }.bind(this));
    }

    //试题推送方法
    handGetRelatedQuizsPlus(accessToken, selectedQuizKnowledgeId, testSubject, testGrade, quizCat, selectedQuizId, extData, amount = 3) {
        let getRelatedQuizsPlusApi = config.API_DOMAIN + config.API_GET_RELATED_QUIZS_PLUS;
        let relatedQuizsData, parameterItemSecond;

        if (extData) {
            let extDataItem = JSON.parse(extData);
            if (extDataItem && extDataItem.tags && extDataItem.tags.quiz) {
                let extItem = extDataItem.tags.quiz;
                if (extItem && extItem.length === 1 && extItem[0] === '') {
                    extDataItem = ['']
                }
                else if (extItem === undefined || extItem.length === 0) {
                    extDataItem = [];
                }
                else {
                    extDataItem = extItem
                }

                if (extDataItem.length === 0) {
                    parameterItemSecond = {}
                }
                else {
                    parameterItemSecond = {
                        quiz_tags: extDataItem
                    }
                }

            }
        }

        let parameter = {
            access_token: accessToken,
            grade: testGrade,
            subject: testSubject,
            accuracy: "exact",
            knowledge_uid: selectedQuizKnowledgeId,
            quiz_uid: selectedQuizId,
            levelword: "zhong_deng",
            amount: amount,
        };

        if (testSubject === 'ying_yu') {
            relatedQuizsData = {
                ...parameter,
                ...parameterItemSecond,
                cat_type: quizCat,
            }
        } else {
            relatedQuizsData = {
                ...parameter,
                ...parameterItemSecond,
            }
        }

        let getRelatedQuizsPlusPromise = $.post(getRelatedQuizsPlusApi, relatedQuizsData);
        getRelatedQuizsPlusPromise.done(function (response) {
            if (response.length !== 0) {
                this.setState({
                    flag: true,
                    relatedQuizs: response
                });
            }

            this.props.handleRelatedQuizsResponse(response);

        }.bind(this));
        getRelatedQuizsPlusPromise.fail(function (errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }

    render() {
        let data = this.props.data;

        //传入标题和数据
        let tHeader = data.tHeader;
        let tData = data.tData;

        //设置样式
        let tStyle = data.tStyle || 'bordered zx-table-scroll';

        let contentTHeader = tHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
        });
        let content;
        let contentTData = tData.map((data, index) => {
            let td = [];
            for (let i = 0; i < data.length; i++) {
                if (i === 3) {
                    content = <a href="javascript:;">{data[i]}</a>
                } else {
                    content = data[i]
                }
                td.push(<td key={i}
                            onClick={this.handleQuizsDetails.bind(this, this.props.data.quizId[index])}>{content}</td>);
            }
            return <tr key={index}>{td}</tr>
        });

        return (
            <div>
                <table className={tStyle}>
                    <thead>
                    <tr>
                        {contentTHeader}
                    </tr>
                    </thead>

                    <tbody>
                    {contentTData}
                    </tbody>
                </table>
            </div>
        )
    }
}


// 此组件只接收父级传来的数据（试题详情和推题）
class DetailModal extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        $(document).ready(function () {
            $('.zx-modal-related-quiz').modal({
                dismissible: false, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 300, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute,
                ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).hide();
                    $('.zx-report-container-wrapper ').mCustomScrollbar('disable');
                }.bind(this),
                complete: function () { // Callback for Modal close
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).show();
                    $('.zx-report-container-wrapper ').mCustomScrollbar('update');
                }
            });
        });
    }

    componentDidUpdate() {
        $('ul.tabs').tabs();
    }

    // 处理题目推送答案隐藏
    handleRelatedQuizAnswerDisplay(e) {
        let answer = $(e.target).parents('.zx-related-quiz-item').find('.zx-related-quiz-answer').toggle(300);
    }

    render() {

        let id = `${this.props.id}-Deatil`;
        let contentaQuizDetail, contentQuizsPlus;
        let originalQuiz = this.props.originalQuiz;
        let relatedQuizsResponse = this.props.relatedQuizsResponse;
        let selectedQuizOrder, Tabs;

        // 原题详情
        if (originalQuiz) {
            let originalQuizBody = originalQuiz.quiz_body;
            let originalQuizAnswer = originalQuiz.qzp_answer;
            selectedQuizOrder = originalQuiz.qzp_order;
            let checkPoint, checkPointItem, checkPointUid;
            if (originalQuiz.lv2_ckp && originalQuiz.lv2_ckp.knowledge[0] && originalQuiz.lv2_ckp.knowledge[0].checkpoint) {
                checkPointUid = originalQuiz.lv2_ckp.knowledge[0].uid;
                checkPoint = originalQuiz.lv2_ckp.knowledge[0].checkpoint;
                checkPointItem = <a href="javascript:;">{checkPoint}</a>;
                checkPoint = <div className="section" onClick={this.props.handleList.bind(this, checkPointUid)}>
                    <h3>知识点</h3>
                    <div className="zx-related-quiz-text">
                        <a href="javascript:;">{checkPointItem}</a>
                    </div>
                </div>
            }
            else {
                checkPoint = <div className="section">
                    <h3>知识点</h3>
                    <div className="zx-related-quiz-text">
                        <p className="zx-related-quiz">暂时无法找到对应指标</p>
                    </div>
                </div>;
            }
            contentaQuizDetail = (
                <div className="section">
                    <div className="zx-related-quiz-item">
                        <div className="section">
                            <h3>原题</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: originalQuizBody}}/>
                        </div>
                        <div className="section">
                            <h3>答案</h3>
                            <div className="zx-related-quiz-text">
                                <div className="zx-related-quiz-text"
                                     dangerouslySetInnerHTML={{__html: originalQuizAnswer}}/>
                            </div>
                        </div>
                        {checkPoint}
                    </div>
                </div>
            );
        }
        else {
            contentaQuizDetail = <Preloader/>;
        }

        // 试题
        if (relatedQuizsResponse) {
            Tabs = <ul className="tabs">
                <li className="tab col s6"><a href={'#' + id + '-tab1'} className="active">原题</a></li>
                <li className="tab col s6"><a href={'#' + id + '-tab2'}>试题推送</a></li>
            </ul>;
            contentQuizsPlus = relatedQuizsResponse.map((quiz, index) => {
                return (
                    <div key={index} className="section">
                        <div className="zx-related-quiz-item">
                            <h3>练习题{index + 1}</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: quiz.text}}/>
                            <div className="zx-related-quiz-answer-title">
                                <h3>答案</h3>
                                <button className="btn" onClick={this.handleRelatedQuizAnswerDisplay.bind(this)}>
                                    展开
                                </button>
                            </div>
                            <div className="zx-related-quiz-answer" dangerouslySetInnerHTML={{__html: quiz.answer}}/>
                        </div>
                    </div>
                )
            });
        }
        else {
            Tabs = <ul className="tabs">
                <li className="tab col s12"><a href={'#' + id + '-tab1'} className="active">原题</a></li>
            </ul>;
        }

        return (
            <div id={id} className="modal zx-modal-related-quiz">
                <div className="modal-content">
                    <span className="zx-font-size">第{selectedQuizOrder}题</span>
                    <span className="zx-close" onClick={this.props.handleDetailClose.bind(this)}>
                        <i className="material-icons zx-font-size">clear</i>
                    </span>
                    <div className="divider"></div>
                    <div className="row">

                        <div className="col s12 zx-overflow-x">
                            {Tabs}
                        </div>

                        <div id={id + '-tab1'} className="col s12">
                            <div className="zx-related-quiz-container">
                                {contentaQuizDetail}
                            </div>
                        </div>

                        <div id={id + '-tab2'} className="col s12">
                            <div className="zx-related-quiz-container">
                                {contentQuizsPlus}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}