import Modal from "./Modal";
import LoadingButton from "@/components/buttons/LoadingButton";
import { AlertTriangle, Trash2 } from "lucide-react";

interface ConfirmationAlertProps {
    isOpen: boolean;
    onClose: () => void;
    confirmDelete: () => void;
    isPending: boolean;
    children: React.ReactNode;
}

const ConfirmationAlert = ({
    isOpen,
    onClose,
    confirmDelete,
    isPending,
    children
}: ConfirmationAlertProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirm Deletion"
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <div className="p-3 bg-red-500/20 rounded-xl text-red-400">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Dangerous Action</h3>
                        <p className="text-red-100/60 text-sm">This action cannot be undone.</p>
                    </div>
                </div>

                {children}

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                    <button
                        onClick={() => onClose()}
                        className="px-6 py-3 rounded-2xl text-blue-100 font-bold hover:bg-white/5 transition-all"
                    >
                        Cancel
                    </button>
                    <div className="w-36">
                        <LoadingButton
                            isPending={isPending}
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-500 shadow-red-500/20"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Trash2 size={18} />
                                <span>Delete</span>
                            </div>
                        </LoadingButton>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmationAlert
