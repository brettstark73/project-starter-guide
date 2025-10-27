import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-indigo-100 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Build Amazing{' '}
            <span className="text-primary-600">SaaS Products</span>{' '}
            Faster
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need to launch your SaaS business. Authentication, payments,
            database, and beautiful UI components - all ready to go.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/signup" className="btn btn-primary text-lg px-8 py-3">
              Start Building <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="btn btn-secondary text-lg px-8 py-3">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </button>
          </div>

          {/* Demo Screenshot */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-2xl p-2">
              <div className="bg-gray-100 rounded aspect-video flex items-center justify-center">
                <span className="text-gray-500 text-lg">Your SaaS Dashboard Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}