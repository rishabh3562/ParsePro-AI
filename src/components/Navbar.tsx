import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Navbar = ({ ishome }: { ishome: boolean }) => {
    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white/60 bg-opacity-60 shadow-lg backdrop-blur-lg">
                <div className="container flex h-16 items-center justify-between px-6">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold text-indigo-600">
                            <FileText className="h-6 w-6 text-indigo-600" />
                            <span>ParseProAI</span>
                        </Link>
                        {ishome && (
                            <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
                                <Link to="/#features" className="hover:text-indigo-600 transition-colors">
                                    Features
                                </Link>
                                <Link to="/#overview" className="hover:text-indigo-600 transition-colors">
                                    Overview
                                </Link>
                            </nav>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
