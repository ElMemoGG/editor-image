import React, { useState, useEffect } from "react";
import "./App.css";
import ImageModal from "./ImageModal";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import { Typography, Input } from "@mui/material";
import { MyComponent } from "./toastEditor";
import Editor from "./test"
import EasyCrop from "./easyCrop"

let editorInstance;

function App() {
  const [open, setOpen] = useState(false);
  const [yourImage, setYourImage] = useState();

  const changeInput = (e) => {
    console.log(e.currentTarget.files);


    if (e.currentTarget.files.length >= 1) {
      setYourImage(e.currentTarget.files[0]); //URL.createObjectURL()
      console.log(e.currentTarget.files[0]);
      console.log(URL.createObjectURL(e.currentTarget.files[0]))
      setOpen(true);
    } else {
      console.log("maximo 1 imagen  ");
    }
  };

  return (
    <div className="App">
      <motion.div
        className="wrap"
        drag
        dragConstraints={{
          top: -50,
          left: -50,
          right: 50,
          bottom: 50,
        }}
    
        initial={{ width: 0, height: 0 }}
        transition={{ duration: "1" }}
        animate={{ width: "30%", height: "30%", padding: "16px" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ delay: 1, duration: "2" }}
          animate={{ opacity: 1 }}
        >
          <Typography variant="h5" sx={{height: "50px", fontFamily: 'Lato, sans-serif'}}>
            Compresor de imágenes 
          </Typography>


        </motion.div>
        <motion.div
        className="center-div"
          initial={{ opacity: 0 }}
          transition={{ delay: 1, duration: "2" }}
          animate={{ opacity: 1 }}
        >
 
        <label>
        <Input hidden type="file" sx={{display: "none"}} onChange={changeInput}/>
        <Button variant="contained" fullWidth component="span">
          Subir imagen
        </Button>
      </label>

        </motion.div>

 
        <ImageModal open={open} setOpen={setOpen}>

          <div className="container-modal">
    
            {/* <MyComponent open={changes} /> */}
            {yourImage && <EasyCrop open={open} setOpen={setOpen} yourImage={yourImage} />}
          
          </div>
        </ImageModal>
      </motion.div>
    </div>
  );
}



export default App;
