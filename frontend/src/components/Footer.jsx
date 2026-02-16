export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-bold mb-2">Arka Pal</h3>
            <p className="text-sm text-gray-400">Building digital experiences that matter.</p>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/yourusername" className="text-sm text-gray-400 hover:text-white">GitHub</a>
            <a href="https://linkedin.com/in/yourusername" className="text-sm text-gray-400 hover:text-white">LinkedIn</a>
            <a href="mailto:your.email@example.com" className="text-sm text-gray-400 hover:text-white">Email</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500"></p>
        </div>
      </div>
    </footer>
  );
}
