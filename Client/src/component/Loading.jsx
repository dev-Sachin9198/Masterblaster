const Loading = () => {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">
      <div className="text-center">
        
        <div className="w-12 h-12 border-4 border-white/20 border-t-[#f84565] rounded-full animate-spin mx-auto"></div>

        <p className="mt-5 text-gray-300 text-lg">
          Loading movie...
        </p>

      </div>
    </div>
  );
};

export default Loading;

