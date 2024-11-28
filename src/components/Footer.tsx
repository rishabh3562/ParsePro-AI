const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100 p-4 md:p-4 lg:p-6 fixed  bottom-0 w-full">
        <div className="container flex items-center justify-between flex-col md:flex-row text-center md:text-left">
          <p className="text-sm font-medium text-gray-700">© 2024 ParseProAI. All rights reserved.</p>
          <a href="https://dubeyrishabh108.vercel.app/home" target="_blank"><p className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">  Made with ❤️ by Rishabh</p></a>
          <nav className="flex space-x-4 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="https://dubeyrishabh108.vercel.app/home/contact" target="_blank" className="hover:text-indigo-600 transition-colors">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  )
}

export default Footer
