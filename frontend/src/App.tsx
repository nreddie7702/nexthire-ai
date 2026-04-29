import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center text-indigo-600 font-bold text-xl">
                  AI Job Automator
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Profile</Link>
                  <Link to="/jobs" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Find Jobs</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full py-8">
          <Routes>
            <Route path="/" element={<Profile />} />
            {/* Will add Jobs and Dashboard later */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
