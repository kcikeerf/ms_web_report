function handleIsGroup(group) {
    if(group){
        if(group.data){
            if(group.data.ckps){
                if(group.data.ckps.knowledge){
                    if(group.data.ckps.knowledge.base){
                        if(group.data.ckps.knowledge.base.score_average){
                            return true;
                        }else {
                            return false;
                        }
                    }else {
                        return false;
                    }
                }else {
                    return false;
                }
            }else{
                return false;
            }
        }else {
            return false;
        }
    }else {
        return false;
    }
}

export default handleIsGroup;