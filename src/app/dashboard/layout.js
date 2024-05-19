// components/Layout.js
import Sidebar from "./components/Sidebar"

export default function Layout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full">
                <nav className="bg-white text-black">
                    <h2 className="text-2xl font-semibold">Welcome Mamoyo</h2>
                </nav>
                <main className="p-6 bg-mainbg flex-grow">
                    hsjghjgjhag
                    {children}
                </main>
            </div>
        </div>
    );
}