import React from 'react';

import PhotoSwipe from 'photoswipe/dist/photoswipe.js';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js';

class PhotoZoom extends React.Component {
    handlePhotoZoom(e) {
        //let pswpElement = $(e.target).siblings('.pswp');
        let pswpElement = document.querySelectorAll('.pswp')[0];

        // build items array
        let items = [
            {
                src: this.props.src,
                w: 964,
                h: 1024
            }
        ];

        // define options (if needed)
        let options = {
            // history & focus options are disabled on CodePen
            history: true,
            focus: true,

            showAnimationDuration: 0,
            hideAnimationDuration: 0

        };

        let gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    }

    render() {
        return(
            <div className="zy-photozoom-container">
                <img src={this.props.src} className="zy-qzp-img" onClick={this.handlePhotoZoom.bind(this)}/>
            </div>

        );
    }
}

export default PhotoZoom;