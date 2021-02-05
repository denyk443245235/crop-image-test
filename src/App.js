import React, { useState, useRef } from "react";
import { TextField, Button } from '@material-ui/core';

import './App.css';

function App() {
  const [image, setImage] = useState('');
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const imgRef = useRef(null);
  
  const style = {
    form: {
      width: '20%',
      height: '50px'
    },
    btn : {
      width: '10%'
    }
  }
  
  const cropAndDownload = (e) => {
    e.preventDefault();
    
    const img = imgRef.current;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    
    context.drawImage(img, x, y, width, height, x, y, canvas.width, canvas.height);
    
    const url = canvas.toDataURL();
    
    const link = document.createElement('a');
    link.download = "image.jpg";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  const getImage = (e) => {
    const image = e.target.files[0];
    const url = URL.createObjectURL(image);
    let img = new Image();
    
    img.onload = function () {
      setHeight(this.height);
      setWidth(this.width);
      setImage(url)
    };
    img.src = url;
  }
  
  return (
    <div className="App">
      <form onSubmit={cropAndDownload}>
        <TextField
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={style.form}
          label="Height"
          type="number"
          variant="outlined"
        />
        <TextField
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          style={style.form}
          label="Width"
          type="number"
          variant="outlined"
        />
        <TextField
          value={x}
          onChange={(e) => setX(e.target.value)}
          style={style.form}
          label="X"
          type="number"
          variant="outlined"
        />
        <TextField
          value={y}
          onChange={(e) => setY(e.target.value)}
          style={style.form}
          label="Y"
          type="number"
          variant="outlined"
        />
        <Button
          style={style.btn}
          variant="contained"
          component="label"
        >
          Upload File
          <input
            onChange={getImage}
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            hidden
          />
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={style.btn}
          disabled={image.length === 0}
        >
          Crop
        </Button>
      </form>
       <img ref={imgRef} className="uploaded-image" id="image" src={image}/>
    </div>
  );
}

export default App;
