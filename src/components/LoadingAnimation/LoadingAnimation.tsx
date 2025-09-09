

const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-blue-500"></div>

        {/* Text */}
        <p className="text-white text-lg font-medium tracking-wide animate-pulse">
          Be right there...
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
