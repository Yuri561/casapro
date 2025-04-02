import {PlusIcon} from "lucide-react"
import {Button} from '../ui/button'


const LearnMoreBtn = () =>{
    return (
        <a href="#how-it-works">

        <Button className="bg-teal-600  cursor-pointer text-white px-8 py-5 hover:bg-teal-700 font-semibold hover:scale-105">
            <PlusIcon/> Learn more
        </Button>
        </a>
    )
}

export default LearnMoreBtn