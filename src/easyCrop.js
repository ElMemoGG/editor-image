import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button, Input, Typography, Slider } from "@mui/material";
import ImageModal from "./ImageModal";
import getCroppedImg from "./cropImage";
import imageCompression from "browser-image-compression";
import { height, width } from "@mui/system";

const EasyCrop = ({ open, setOpen, yourImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [compre, setCompre] = useState(null);

  const browCompre = async (imageFile) => {
    //200kb maximo
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 512,
      useWebWorker: true,
      alwaysKeepResolution: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(compressedFile);
      /* console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true */
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      const size = compressedFile.size / 1024;

      const myFile = new File([compressedFile], yourImage.name, {
        type: yourImage.type,
      });
      console.log(URL.createObjectURL(myFile));
      setCroppedImage(myFile);

    } catch (error) {
      console.log("error", error);
    }
  };
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        yourImage,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      browCompre(croppedImage);

      /* console.log(URL.createObjectURL(croppedImage))
    setCroppedImage(croppedImage) */
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <>
      {yourImage && (
        <ImageModal open={open} setOpen={setOpen}>
          <div className="easy-cropper">
            <div className="title">
              <Typography variant="h6">Edita la imagen</Typography>
            </div>
            <div className="title">
              <Typography variant="h6">Resultado</Typography>
            </div>
            <div className="crop-container">
              <Cropper
                image={URL.createObjectURL(yourImage)}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="crop-result">
              {croppedImage && (
                <div style={{ width: "40vh", height: "auto" }}>
                  <img
                    src={URL.createObjectURL(croppedImage)}
                    style={{ width: "100%", height: "100%" }}
                    alt="Cropped"
                  />
                </div>
              )}
            </div>

            <div className="controlers">
              <Typography variant="overline" sx={{ margin: "0px 15px" }}>
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />

              <Typography variant="overline" sx={{ margin: "0px 15px" }}>
                Rotation
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(e, rotation) => setRotation(rotation)}
              />
   


            </div>
            <div className="button-container">
              <div className="button">
                <Button
                fullWidth
                  onClick={showCroppedImage}
                  variant="contained"
                  color="primary"
                >
                  Show Result
                </Button>
                </div>
                {croppedImage &&
                <div className="button">
                <Button
                  component="a"
                  download
                  href={URL.createObjectURL(croppedImage)}
                  /* onClick={showCroppedImage} */
                  variant="contained"
                  color="primary"
                >
                  Descargar
                </Button>
                </div>}
              </div>

            {/*             {croppedImage && (
              <div>
                <h3>Result</h3>
                <div>
                  <img src={URL.createObjectURL(croppedImage)} alt="Cropped" />
                </div>
              </div>
            )} */}
          </div>
        </ImageModal>
      )}
    </>
  );
};

export default EasyCrop;
