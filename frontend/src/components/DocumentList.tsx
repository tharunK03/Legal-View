import { useState, useEffect } from 'react'
import { FileText, Download, Trash2, Eye, Search, RefreshCw } from 'lucide-react'
import axios from 'axios'

interface Document {
  name: string
  display_name: string
  size: number
  type: string
  uploaded: number
  path: string
}

interface DocumentListProps {
  documents: string[]
}

const DocumentList = ({ documents: _documents }: DocumentListProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [backendDocuments, setBackendDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch documents from backend
  const fetchDocuments = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get('http://localhost:8001/documents')
      setBackendDocuments(response.data.documents || [])
    } catch (error) {
      console.error('Error fetching documents:', error)
      setError('Failed to load documents. Please check if the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const filteredDocuments = backendDocuments.filter(doc =>
    doc.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString()
  }

  const handleViewDocument = (doc: Document) => {
    // For PDF files, open in a new tab
    if (doc.type === '.pdf') {
      window.open(`http://localhost:8001/documents/${doc.name}/download`, '_blank')
    } else {
      // For other file types, show content in a modal or new tab
      window.open(`http://localhost:8001/documents/${doc.name}`, '_blank')
    }
  }

  const handleDownloadDocument = async (doc: Document) => {
    try {
      const response = await axios.get(`http://localhost:8001/documents/${doc.name}/download`, {
        responseType: 'blob'
      })
      
      // Create a blob URL and trigger download
      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = doc.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading document:', error)
      alert('Failed to download document. Please try again.')
    }
  }

  const handleDeleteDocument = async (doc: Document) => {
    if (window.confirm(`Are you sure you want to delete "${doc.display_name}"? This action cannot be undone.`)) {
      try {
        await axios.delete(`http://localhost:8001/documents/${doc.name}`)
        // Refresh the document list
        await fetchDocuments()
        alert('Document deleted successfully!')
      } catch (error) {
        console.error('Error deleting document:', error)
        alert('Failed to delete document. Please try again.')
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Document Library
          </h2>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        </div>
        <p className="text-lg text-slate-600 font-medium">Manage and view all your uploaded legal documents</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="flex-1 max-w-md">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 placeholder-slate-400"
              />
            </div>
          </div>
          <button
            onClick={fetchDocuments}
            disabled={loading}
            className="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-300`} />
            <span className="font-semibold">Refresh</span>
          </button>
          <div className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-medium text-slate-700">
            {loading ? 'Loading...' : `${filteredDocuments.length} documents`}
          </div>
        </div>
      </div>

      {error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Documents</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={fetchDocuments}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-legal-600">Loading documents...</p>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-legal-400 mb-4" />
          <h3 className="text-lg font-medium text-legal-900 mb-2">No documents found</h3>
          <p className="text-legal-600">
            {searchTerm ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocuments.map((doc, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-xl rounded-3xl border border-white/30 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-indigo-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200">
                    ✓ Processed
                  </span>
                </div>
                
                <h3 className="font-bold text-slate-900 mb-4 truncate text-lg" title={doc.display_name}>
                  {doc.display_name}
                </h3>
                
                <div className="space-y-3 text-sm text-slate-600 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Type:</span>
                    <span className="px-2 py-1 bg-slate-100 rounded-lg font-semibold text-slate-700">{doc.type.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Size:</span>
                    <span className="font-semibold text-slate-700">{formatFileSize(doc.size)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Uploaded:</span>
                    <span className="font-semibold text-slate-700">{formatDate(doc.uploaded)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <button 
                    onClick={() => handleViewDocument(doc)}
                    className="group/btn flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    <span>View</span>
                  </button>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleDownloadDocument(doc)}
                      className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:scale-110"
                      title="Download document"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteDocument(doc)}
                      className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 transform hover:scale-110"
                      title="Delete document"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DocumentList
