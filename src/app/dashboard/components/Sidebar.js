import Link from 'next/link';
import { AiFillDashboard, AiFillDatabase,  AiOutlineBulb, AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/navigation';


export default function Sidebar({onClose}) {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/signin');
      };
    return (
        <div className="h-screen w-3/5 z-50 bg-primary text-white flex flex-col md:justify-between text-sm fixed md:w-64 md:static ">          
            <button onClick={onClose} className="self-end p-4 md:hidden">
                <AiOutlineClose className="text-2xl" />
            </button> 
            <div className="p-4">
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 rounded-full mb-4" src="/images/profile.png" alt="Profile" />
                    <h2 className="text-sm font-semibold">Ma Dube</h2>
                </div>
                <ul className='flex flex-col pl-8'>
                    <li className="mb-4 py-2">
                        <Link href="/dashboard">
                            <div className="flex items-center"><AiFillDashboard className="mr-2" /> Dashboard</div>
                        </Link>
                    </li>
                    <li className="mb-4 py-2">
                        <Link href="/dashboard/inventory">
                            <div className="flex items-center"><AiFillDatabase className='mr-2' /> Inventory</div>
                        </Link>
                    </li>
                    <li className="mb-4 py-2">
                        <Link href="/dashboard/analytics">
                            <div className="flex items-center"><AiOutlineBulb className='mr-2' /> Analytics</div>
                        </Link>
                    </li>

                </ul>
            </div>
            <div className="pl-14 pb-5">
                <div className="flex items-center text-slate-400 cursor-pointer" onClick={handleLogout}><AiOutlineLogout className='mr-2' /> Logout</div>
            </div>
        </div>
    );
}