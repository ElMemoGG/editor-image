import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import Grow from "@mui/material/Grow";
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';


const style = {
/*   position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-40%, -50%)", */

  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, setOpen, children}) {

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    < >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        closeAfterTransition
        aria-describedby="modal-modal-description"

      >
        <motion.div
          
              initial={{ opacity: 0 }}
              transition={{ duration: "2" }}
              animate={{ opacity: 1 }}
              exit={{opacity: 0}}
         >
          <Box className="box" sx={{ display:"inline-block",  bgcolor: "background.paper"}}>
              {children}
          </Box>
        </motion.div>
        
      </Modal>


      </>
  );
}




