import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';

import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  content,
  actions,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default Modal;
