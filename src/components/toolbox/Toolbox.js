import {FaPaintBrush,FaEraser} from 'react-icons/fa';

import COLORS_Data from 'data/ColorsData';

import './Toolbox.css';

const Toolbox=({paintingTool,changeTypeHandler,changeWidthHandler,changeColorHandler,clearHandler,saveHandler})=>{
    return (
        <div className="toolbox">
            <div className="options">
                <h2 className="options-title">選擇:</h2>
                <p className={paintingTool.type==="brush"?"tool tool-active":"tool"} onClick={()=>changeTypeHandler("brush")}><FaPaintBrush />&nbsp;Brush</p>
                <p className={paintingTool.type==="eraser"?"tool tool-active":"tool"} onClick={()=>changeTypeHandler("eraser")}><FaEraser />&nbsp;Eraser</p>
            </div>
            <div className="size">
                <h2 className="size-title">大小:</h2>
                <input type="range" className="input" name="width" value={paintingTool.width} min="1" max="10" step="1" onChange={changeWidthHandler} />
            </div>
            <div className="colors">
                <h2 className="colors-title">顏色:</h2>
                <div className="colors-group">
                    {COLORS_Data.map(color=>(
                        <span key={color.id}>
                            <input type="radio" className="input" id={color.colorName} name="color" value={color.colorName} checked={paintingTool.color===color.colorName} onChange={changeColorHandler} />
                            <span className="color-border"><label htmlFor={color.colorName} style={{backgroundColor: color.colorName}} className="color"></label></span>
                        </span>
                    ))}
                </div>
            </div>
            <button className="btn btn-clear" onClick={clearHandler}>全部清除</button>
            <button className="btn btn-save" onClick={saveHandler}>儲存</button>
        </div>
    );
}

export default Toolbox;