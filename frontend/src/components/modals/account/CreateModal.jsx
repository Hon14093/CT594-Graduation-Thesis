import React, { useState } from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Asterisk } from 'lucide-react';
import { createAccount } from '@/hooks/account-api';

export default function CreateModal({ onSubmitSuccess, role_id }) { // 2 means employee, 3 means admin
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmitSuccess = () => {
        onSubmitSuccess();
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                username,
                password,
                email,
                phone,
                role_id
            }

            console.log(data);
            const res = await createAccount(data);
            if (res.status === 201) handleSubmitSuccess();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    <Plus />
                    {role_id === 2 ? 'Thêm tài khoản nhân viên' : 'Thêm tài khoản admin'}
                </Button>
            </DialogTrigger>

            <DialogContent className='!max-w-none w-1/3 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Thêm tài khoản {role_id === 2 ? 'nhân viên' : 'admin'}</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">
                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tên tài khoản:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Tên tài khoản" 
                                onChange={(e) => setUsername(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Mật khẩu:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Mật khẩu" 
                                onChange={(e) => setPassword(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Email:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Số điện thoại:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Số điện thoại" 
                                onChange={(e) => setPhone(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        {role_id === 2 ? (
                            <button type='submit' className='big-action-button mb-2'>
                                Thêm tài khoản nhân viên
                            </button>
                        ) : (
                            <button type='submit' className='big-action-button mb-2'>
                                Thêm tài khoản admin
                            </button>
                        )}
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
