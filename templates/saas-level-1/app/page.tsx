export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold text-indigo-600">SaaS Starter</div>
            <div className="space-x-4">
              <a href="#features" className="text-gray-700 hover:text-indigo-600">
                Features
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-indigo-600">
                Pricing
              </a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build Your SaaS Product Faster
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A production-ready starter template with Next.js 15, Tailwind CSS, and everything you need to launch your
            SaaS.
          </p>
          <div className="space-x-4">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700">
              Get Started
            </button>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50">
              View Docs
            </button>
          </div>
        </section>

        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Fast Setup</h3>
              <p className="text-gray-600">Get started in minutes with our pre-configured stack</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-3xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-2">Authentication</h3>
              <p className="text-gray-600">Ready-to-use auth with Supabase integration</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-3xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-2">Payments</h3>
              <p className="text-gray-600">Stripe integration for subscriptions and billing</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Simple Pricing</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Pro Plan</h3>
            <div className="text-4xl font-bold text-indigo-600 mb-6">
              $29<span className="text-xl text-gray-600">/month</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                All features included
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited users
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                24/7 support
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
              Start Free Trial
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 SaaS Starter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
