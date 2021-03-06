import React, { PureComponent } from 'react'

class PureVideoComp extends PureComponent
{
    render() {
        console.log("rendered");
        return (
            <>
                <video
                        controls
                        width="350"
                        src={URL.createObjectURL(this.props.videoSrc)}
                ></video>
            </>
        );
    }
}

export default PureVideoComp;