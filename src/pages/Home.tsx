import {  BarChart2, Users, FileText,  } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
       


            <main className="flex-1 bg-white flex justify-center items-center py-12 md:py-24">
                <section className="container text-center space-y-8 max-w-lg md:max-w-xl lg:max-w-2xl px-6">
                    <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">Automated Data Extraction & Invoice Management</h1>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">Streamline your invoice processing with AI-powered data extraction and intelligent management tools.</p>
                    <div className="flex justify-center space-x-6">

                        <Link
                            to="/upload"
                            className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                        >
                            Get Started
                        </Link>
                        <a href="#features" className="px-6 py-3 text-lg font-semibold text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 rounded-md">Learn More</a>
                    </div>
                </section>
            </main>

            <section id="features" className="bg-gray-100 p-12 md:p-24 lg:p-32">
                <div className="container text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Key Features</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                            <h3 className="text-xl font-semibold text-indigo-600">AI-Powered Data Extraction</h3>
                            <p className="text-gray-700">Automatically extract key information from invoices with high accuracy using advanced AI algorithms.</p>
                        </div>
                        <div className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                            <h3 className="text-xl font-semibold text-indigo-600">Intelligent Invoice Management</h3>
                            <p className="text-gray-700">Organize, categorize, and manage your invoices effortlessly with our smart management system.</p>
                        </div>
                        <div className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                            <h3 className="text-xl font-semibold text-indigo-600">Real-time Analytics</h3>
                            <p className="text-gray-700">Gain valuable insights into your financial data with real-time analytics and customizable reports.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="overview" className="p-12 md:p-24 lg:p-32">
                <div className="container text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-12">App Overview</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                            <div className="flex items-center mb-4">
                                <BarChart2 className="h-12 w-12 text-indigo-600 mr-4" />
                                <h3 className="text-xl font-semibold text-gray-900">Invoices</h3>
                            </div>
                            <p className="text-gray-700">View, manage, and analyze all your invoices in one place. Track payment status and due dates effortlessly.</p>
                        </div>
                        <div className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                            <div className="flex items-center mb-4">
                                <FileText className="h-12 w-12 text-indigo-600 mr-4" />
                                <h3 className="text-xl font-semibold text-gray-900">Products</h3>
                            </div>
                            <p className="text-gray-700">Manage your product catalog, track inventory, and analyze product performance across invoices.</p>
                        </div>
                        <div className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                            <div className="flex items-center mb-4">
                                <Users className="h-12 w-12 text-indigo-600 mr-4" />
                                <h3 className="text-xl font-semibold text-gray-900">Customers</h3>
                            </div>
                            <p className="text-gray-700">Keep track of customer information, payment history, and generate insights to improve customer relationships.</p>
                        </div>
                    </div>
                </div>
            </section>

            
        </div>
    );
}
