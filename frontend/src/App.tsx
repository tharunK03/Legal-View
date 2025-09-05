import { useState } from 'react'
import { FileText, Upload, Search, Scale, Sparkles, Github, Linkedin } from 'lucide-react'
import DocumentUpload from './components/DocumentUpload'
import ChatInterface from './components/ChatInterface'
import DocumentList from './components/DocumentList'

type TabType = 'upload' | 'chat' | 'documents'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('upload')
  const [documents, setDocuments] = useState<string[]>([])

  const handleDocumentUploaded = (filename: string) => {
    setDocuments(prev => [...prev, filename])
    setActiveTab('chat')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/90 backdrop-blur-xl shadow-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300">
                  <Scale className="h-10 w-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent drop-shadow-sm">
                  LegalView
                </h1>
                <p className="text-sm text-slate-600 flex items-center space-x-2 mt-1">
                  <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
                  <span className="font-medium">AI-Powered Legal Document Assistant</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/50 shadow-lg">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-sm text-green-700 font-semibold">AI Assistant Ready</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 py-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`group relative flex items-center space-x-3 px-8 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'upload'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-lg'
              }`}
            >
              <Upload className={`h-5 w-5 transition-transform duration-300 ${activeTab === 'upload' ? 'animate-bounce' : 'group-hover:scale-110'}`} />
              <span>Upload Documents</span>
              {activeTab === 'upload' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-sm opacity-50 -z-10"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`group relative flex items-center space-x-3 px-8 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-lg'
              }`}
            >
              <Search className={`h-5 w-5 transition-transform duration-300 ${activeTab === 'chat' ? 'animate-bounce' : 'group-hover:scale-110'}`} />
              <span>Ask Questions</span>
              {activeTab === 'chat' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-sm opacity-50 -z-10"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`group relative flex items-center space-x-3 px-8 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'documents'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-lg'
              }`}
            >
              <FileText className={`h-5 w-5 transition-transform duration-300 ${activeTab === 'documents' ? 'animate-bounce' : 'group-hover:scale-110'}`} />
              <span>Document Library</span>
              {activeTab === 'documents' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-sm opacity-50 -z-10"></div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-10 overflow-hidden">
          {/* Content Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-indigo-50/50 rounded-3xl"></div>
          
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 p-[1px]">
            <div className="w-full h-full bg-white/80 backdrop-blur-xl rounded-3xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {activeTab === 'upload' && (
              <DocumentUpload onDocumentUploaded={handleDocumentUploaded} />
            )}
            {activeTab === 'chat' && (
              <ChatInterface documents={documents} />
            )}
            {activeTab === 'documents' && (
              <DocumentList documents={documents} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white mt-auto overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">LegalView</h3>
              </div>
              <p className="text-blue-200 font-medium mb-2">AI-Powered Legal Document Assistant</p>
              <p className="text-blue-300/80 text-sm">Built with React, Vite, and AI Technology</p>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <p className="text-blue-200 font-medium mb-3">Built by</p>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-white text-lg font-bold">T</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-md opacity-50 -z-10"></div>
                  </div>
                  <span className="text-xl font-bold text-white">Tharun</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="https://github.com" 
                  className="group p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                  title="GitHub"
                >
                  <Github className="h-6 w-6 text-white group-hover:text-blue-200 transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/tharun-k03/" 
                  className="group p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                  title="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-white group-hover:text-blue-200 transition-colors" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="text-blue-300/80 text-sm">
              © 2024 LegalView. All rights reserved. | Powered by AI Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
