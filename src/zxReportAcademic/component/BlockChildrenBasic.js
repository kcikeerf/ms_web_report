import React, {Component} from 'react';
import {BlockChildrenBasicScatter} from './BlockChildrenBasicScatter';
import {BlockChildrenBasicTable} from './BlockChildrenBasicTable';

class BlockChildrenBasic extends Component{

    render(){
        let chlidrenBasicData = this.props.chlidrenBasicData;
        let contentSchoolBaseTableDefault,contentSchoolBaseScatterDefault;

        //各学校散点图
        if(chlidrenBasicData){
            contentSchoolBaseScatterDefault  = <BlockChildrenBasicScatter data={chlidrenBasicData.chlidrenBasicScatterData} />;
        }
        //学校基本信息表格
        if(chlidrenBasicData){
            contentSchoolBaseTableDefault  = <BlockChildrenBasicTable tHeader={chlidrenBasicData.chlidrenBasicTitleData.header} tData={chlidrenBasicData.chlidrenBasicTitleData.data}/>;
        }
        return(
            <div className="section">
                <h2 className="zx-header-highlight zx-header-highlight-teal">各学校表现情况</h2>
                {contentSchoolBaseScatterDefault}
                {contentSchoolBaseTableDefault}
            </div>
        )
    }
}

export default BlockChildrenBasic;