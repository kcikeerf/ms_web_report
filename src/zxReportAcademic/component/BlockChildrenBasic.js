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
            <div>
                {contentSchoolBaseTableDefault}
                {contentSchoolBaseScatterDefault}
            </div>
        )
    }
}

export default BlockChildrenBasic;