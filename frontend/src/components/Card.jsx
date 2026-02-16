export default function Card({ children, className = "" }) {
  return (
    <div className={`border border-gray-200 p-6 hover:border-gray-400 transition-colors ${className}`}>
      {children}
    </div>
  );
}
