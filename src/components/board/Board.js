import './Board.css';

const Board=({canvasRef,startDrawing,onDrawing,stopDrawing})=>{
    return (
        <div className="board">
            <canvas className="canvas" onMouseDown={startDrawing} onMouseMove={onDrawing} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} ref={canvasRef} />
        </div>
    );
}

export default Board;