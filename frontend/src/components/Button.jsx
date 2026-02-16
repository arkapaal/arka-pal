export default function Button({ onClick, children, variant = "primary" }) {
  const baseStyles = "px-6 py-3 text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800",
    secondary: "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}
