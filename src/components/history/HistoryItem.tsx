import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import { SearchHistoryItem } from '@app/components/chatForm/types/SearchHistoryItem';

export function HistoryItem({ open, handleClose, selectedItem }: { open: boolean; handleClose: () => void; selectedItem: SearchHistoryItem | null }) {
  return (
    <Dialog id="history-modal" open={open} onClose={handleClose}>
      <DialogTitle id="description-dialog-title">Recommendation Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <strong>Description:</strong> {selectedItem?.userDescription}
        </Typography>
        <Typography variant="body1">
          <strong>Suggestion:</strong> {selectedItem?.suggestion}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}