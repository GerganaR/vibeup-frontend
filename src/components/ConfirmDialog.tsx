import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  loading = false,
}: ConfirmDialogProps) {
  const content = description || message || "";

  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogHeader className="flex items-center gap-3">
        {danger && (
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
        )}
        <Typography variant="h5">{title}</Typography>
      </DialogHeader>
      <DialogBody>
        <Typography className="text-gray-700">{content}</Typography>
      </DialogBody>
      <DialogFooter className="gap-2">
        <Button
          variant="text"
          color="gray"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          variant="filled"
          color={danger ? "red" : "green"}
          onClick={onConfirm}
          disabled={loading}
          loading={loading}
        >
          {confirmText}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

