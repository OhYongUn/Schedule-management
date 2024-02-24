import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";

function MuiModal({ open, handleClose, children }) {
  // children prop 추가
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // 모달의 너비 지정
          border: "2px solid #000",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}

export default MuiModal;
