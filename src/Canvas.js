import React from 'react';

const RATIO = 5 / 2;

class Canvas extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas
        this.ctx = canvas.getContext("2d");
    }

    componentDidUpdate(prevProps) {
        const { data, width } = this.props;
        if(prevProps.data !== data || width !==prevProps.width) {  
            this.clearCanvas();
            const height = width / RATIO;
            const center = [width / 2, height / 2];
            this.ctx.translate(center[0], center[1]);
            this.draw();
        }
    }

    clearCanvas = () => {
        const canvas = this.refs.canvas;

        // Use the identity matrix while clearing the canvas
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw = () => {
        const { data, width } = this.props;
        
        try {
            const json = JSON.parse(data);
            // only use nodes with specific key
            const dataToRender = json.filter(item => item["Prefab"] = "HandLineRendererVariant")
            
            const SCALE_X = width / 1.5;
            const SCALE_Y = width / RATIO / 1.0 ;

            dataToRender.forEach(item => {
                const strokeArr = item["Stroke"];
                if (!item["Stroke"]) return
                const linePoints = [],
                    chunkSize = 3;
                for (let i = 0, len = strokeArr.length; i < len; i += chunkSize)
                    linePoints.push(strokeArr.slice(i, i + chunkSize));

                this.ctx.beginPath();
                const startPoint = linePoints[0]
                this.ctx.moveTo(startPoint[0] * SCALE_X, -startPoint[1] * SCALE_Y);
                for (let i = 1; i < linePoints.length; i++) {
                    const point = linePoints[i];
                    if (item["PointMask"][i] === 1) {
                        this.ctx.lineTo(point[0] * SCALE_X, -point[1] * SCALE_Y);
                    } else {
                        this.ctx.moveTo(point[0] * SCALE_X, -point[1] * SCALE_Y)
                    }
                    
                }

                this.ctx.stroke();
            })
        } catch (e) {
            console.error(e);
        }
        
    }

    render() {
        const { width } = this.props;
        return(
            <div>
            <canvas ref="canvas" width={width} height={width / RATIO} />
            </div>
        )
    }
  }
  export default Canvas