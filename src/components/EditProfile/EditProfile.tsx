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
import { Edit } from "lucide-react"
import React, { useState } from "react";


const EditProfile: React.FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const username = localStorage.getItem("user_id")
    return (


        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-md shadow-lg mt-2">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <div className="col-span-3 text-gray-700 bg-gray-100 p-2 rounded">
                            {username}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            password
                        </Label>
                        <Input id="password" placeholder="change password" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="confirm" className="text-right">
                            confirm 
                        </Label>
                        <Input id="password" placeholder="confirm password" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            email
                        </Label>
                        <Input id="email" placeholder="edit email" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="categories" className="text-right">
                            categories
                        </Label>
                        <Input id="category" placeholder="add category" className="col-span-3" />
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

