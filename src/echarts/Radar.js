// 引入 ECharts 主模块
let _echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/radar');
// 引入Legend
require('echarts/lib/component/legend');

//let _echarts = require('echarts');

let _echarts2 = _interopRequireDefault(_echarts);

let _react = require('react');

let _react2 = _interopRequireDefault(_react);

let _elementResizeEvent = require('element-resize-event');

let _elementResizeEvent2 = _interopRequireDefault(_elementResizeEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

let ReactEchartsRadar = _react2['default'].createClass({
    displayName: 'ReactEcharts',

    propTypes: {
        option: _react2['default'].PropTypes.object.isRequired,
        style: _react2['default'].PropTypes.object,
        className: _react2['default'].PropTypes.string,
        theme: _react2['default'].PropTypes.string,
        onChartReady: _react2['default'].PropTypes.func,
        showLoading: _react2['default'].PropTypes.bool,
        onEvents: _react2['default'].PropTypes.object
    },
    // first add
    componentDidMount: function componentDidMount() {
        let echartObj = this.renderEchartDom();
        let onEvents = this.props.onEvents || [];

        let _loop = function _loop(eventName) {
            // ignore the event config which not satisfy
            if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
                // binding event
                echartObj.on(eventName, function (param) {
                    onEvents[eventName](param, echartObj);
                });
            }
        };

        for (let eventName in onEvents) {
            _loop(eventName);
        }
        // on chart ready
        if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj);

        // on resize
        (0, _elementResizeEvent2['default'])(this.refs.echartsDom, function () {
            echartObj.resize();
        });
    },

    // update
    componentDidUpdate: function componentDidUpdate() {
        this.renderEchartDom();
    },

    // remove
    componentWillUnmount: function componentWillUnmount() {
        _echarts2['default'].dispose(this.refs.echartsDom);
    },

    // render the dom
    renderEchartDom: function renderEchartDom() {
        // init the echart object
        let echartObj = this.getEchartsInstance();
        // set the echart option
        echartObj.setOption(this.props.option);

        // set loading mask
        if (this.props.showLoading) echartObj.showLoading();else echartObj.hideLoading();

        return echartObj;
    },
    getEchartsInstance: function getEchartsInstance() {
        // return the echart object
        return _echarts2['default'].getInstanceByDom(this.refs.echartsDom) || _echarts2['default'].init(this.refs.echartsDom, this.props.theme);
    },
    render: function render() {
        let style = this.props.style || { height: '300px' };
        // for render
        return _react2['default'].createElement('div', { ref: 'echartsDom',
            className: this.props.className,
            style: style });
    }
});
module.exports = ReactEchartsRadar;