import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleX, Trash2 } from "lucide-react";

export default function ConfirmDeleteModal({
    open,
    onClose,
    onConfirm,
    title = "Bạn có chắc chắn muốn xóa mục này?",
    icon = <CircleX color='red' size={120} className='mx-auto pb-4' />,
    confirmLabel = "Xóa",
    cancelLabel = "Hủy",
    confirmClassName = "p-5 bg-red-500 border border-red-500 hover:bg-white hover:text-red-500",
}) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            {/* <DialogTrigger asChild>
                <Button size="sm" className='bg-red-500 border border-red-500 hover:bg-white hover:text-red-500'
                    // onClick={() => handleDelete(row.original)}
                >
                    <Trash2 />
                </Button>
            </DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='mx-auto text-lg text-center'>
                        {icon}
                        {title}
                    </DialogTitle>

                    <section className='flex justify-center gap-3 mt-6'>
                        <Button className='p-5' onClick={onClose}>
                            {cancelLabel}
                        </Button>

                        <Button onClick={onConfirm} className={confirmClassName}>
                            <Trash2 className="mr-2" />
                            {confirmLabel}
                        </Button>
                    </section>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
