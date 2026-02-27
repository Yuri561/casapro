import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import React, { useState } from "react";
import { Edit } from "lucide-react";


const EditProfile: React.FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const username = localStorage.getItem("user_id")
    return (


        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-indigo-500 text-white border-white/10">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-indigo-500 p-6 rounded-md shadow-lg mt-2">
                <DialogHeader>
                    <DialogTitle className="text-white">Edit profile</DialogTitle>
                    <DialogDescription className="text-white">
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right text-white text-md">
                            Name
                        </Label>
                        <div className="col-span-3 text-gray-700 bg-gray-100 p-2 rounded">
                            {username}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right text-white text-md">
                            password
                        </Label>
                        <Input id="password" placeholder="change password" className="col-span-3 text-gray-700 bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="confirm" className="text-right text-white text-md">
                            confirm
                        </Label>
                        <Input id="password" placeholder="confirm password" className="col-span-3 text-gray-700 bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right text-white text-md">
                            email
                        </Label>
                        <Input id="email" placeholder="edit email" className="col-span-3 text-gray-700 bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="categories" className="text-right text-white text-md">
                            categories
                        </Label>
                        <Input id="category" placeholder="add category" className="col-span-3 text-gray-700 bg-gray-100" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-blue-700 cursor-pointer text-white hover:scale-105">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}


export default EditProfile

