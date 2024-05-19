import Link from 'next/link';
import { AiFillDashboard, AiFillDatabase,  AiOutlineBulb, AiOutlineLogout } from 'react-icons/ai';

export default function Sidebar() {
    return (
        <div className="h-screen w-4/5 z-50 hidden bg-primary text-white flex flex-col justify-between text-sm fixed md:w-64 md:static">
            <div className="p-4">
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 rounded-full mb-4" src="/images/profile.png" alt="Profile" />
                    <h2 className="text-sm font-semibold">Ma Dube</h2>
                </div>
                <ul className='flex flex-col pl-8'>
                    <li className="mb-4 py-2">
                        <Link href="/">
                            <div className="flex items-center"><AiFillDashboard className="mr-2" /> Dashboard</div>
                        </Link>
                    </li>
                    <li className="mb-4 py-2">
                        <Link href="/inventory">
                            <div className="flex items-center"><AiFillDatabase className='mr-2' /> Inventory</div>
                        </Link>
                    </li>
                    <li className="mb-4 py-2">
                        <Link href="/inventory">
                            <div className="flex items-center"><AiOutlineBulb className='mr-2' /> Analytics</div>
                        </Link>
                    </li>

                </ul>
            </div>
            <div className="pl-14 pb-5">
                <Link href="/logout">
                    <div className="flex items-center"><AiOutlineLogout className='mr-2' /> Logout</div>
                </Link>
            </div>
        </div>
    );
}