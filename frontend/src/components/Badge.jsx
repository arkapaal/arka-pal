export default function Badge({ children }) {
  return (
    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
      {children}
    </span>
  );
}
