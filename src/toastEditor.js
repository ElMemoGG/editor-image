import React,{createFactory, useEffect, useState} from 'react'
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from '@toast-ui/react-image-editor';
import { Button } from '@mui/material';
import Compressor from 'compressorjs';
import imageCompression from 'browser-image-compression';


const myTheme = {
    // Theme object to extends default dark theme.
  };
 export const MyComponent = ({open}) => {
    const  editorRef = React.createRef();
    const [editor,setEditor]=React.useState("")
    const [compressedFile, setCompressedFile] = useState(null);
    
  
   useEffect(() => {
    console.log(editorRef.current.getInstance()) 
    let editorInstance = editorRef.current.getInstance();
    editorInstance.ui.resizeEditor({
      imageSize: {oldWidth: 100, oldHeight: 100, newWidth: 550, newHeight: 550},
      uiSize: {width: 1000, height: 1000}
  });
  editorInstance.ui.resizeEditor()

/*     editorInstance.ui.resizeEditor({
        imageSize: {oldWidth: 100, oldHeight: 100, newWidth: 550, newHeight: 550},
        
    });
   */


  
  
    console.log(editorInstance.toDataURL())
    const file = new File([editorInstance.toDataURL()], editorInstance.getImageName(),{ type: "image/png" })
    console.log(file)

    console.log(editorInstance )
    editorInstance.ui.resizeEditor()

/*     if(editorInstance.getImageName()){
      editorInstance.resize({
        dimensions: {
        width: 550,
        height: 550,
      }
    })
    editorInstance.resize().then(obj=>{
      console.log(obj)
    }).catch(message=>{
      console.log(message)
    });
    } */ 
    const canvas =  editorInstance.getCanvasSize();
    console.log(canvas)
   }, [editorRef, open]);

   const urltoFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  };
    
  const reSize2 = async () => {
    let editorInstance = editorRef.current.getInstance();
 

    const file = await urltoFile(
      editorInstance.toDataURL(),
      editorInstance.getImageName(),
      "image/jpeg"
    );

    console.log(URL.createObjectURL(file));
    browCompre(file)




  }
   
   const  reSize = async () => {
    let editorInstance = editorRef.current.getInstance();
    const canvas =  editorInstance.getCanvasSize();
    

    editorInstance.resize({
      width: 512,
      height: 512

    }).then( ()  =>{
       /* const file = new File([editorInstance.toDataURL()], editorInstance.getImageName(),{ type: "image/jpeg" })  */

      /* console.log("before compressor",file) */
      /* compre(file) */


     
    



      
    }).catch(message=>{
      console.log(message)
    });

    console.log(editorInstance.toDataURL())

    /* new Compressor(file, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success (result) {
        const formData = new FormData();
        formData.append('file', result, result.name);
    
        console.log(formData)        
        setCompressedFile(formData)
      },
      error(err) {
        console.log(err.message);
      },
    });  */
    
   }
    const   compre   =  (file)  => {
    const compressor = new Compressor(file, {quality: 0.6})
    console.log(compressor)
   }

   const  browCompre= async (imageFile) => {
    
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 512,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(compressedFile)
      /* console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true */
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
  
      const myFile = new File([compressedFile], 'image.jpeg', {
        type: compressedFile.type,
    });
    console.log(myFile)

      const data = new FormData();
      data.append('file', compressedFile);
      console.log(data.values("file"))

      console.log(URL.createObjectURL(myFile))
    } catch (error) {
      console.log("error" ,error);
    }
   }


    

  return (
    <>
    <ImageEditor
  
      ref={editorRef}
      includeUI={{
        
        theme: myTheme,
        menu: ['crop','flip', "filter", "resize"],
        /* initMenu: 'crop', */
        uiSize: {
          width: '80vw',
          height: '70vh',
        },
        menuBarPosition: 'right',
      }}
/*       resize={{
        dimensions: {
        width: 550,
        height:550
      }}} */
      cssMaxHeight={800}
      cssMaxWidth={800}
      selectionStyle={{
        cornerSize: 20,
        rotatingPointOffset: 70,
      }}
  
   
      usageStatistics={false}
    />
    <Button onClick={()=> reSize2()}>
      Resize
    </Button>
    </>
    );
    };
  