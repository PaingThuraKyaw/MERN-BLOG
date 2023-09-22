const Loading = () => {
  return (
    <div className="flex items-center justify-center fixed top-0 w-full bg-black/10 left-0 h-[100vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-r-2 border-b-4  border-gray-600"></div>
    </div>
  );
};

export default Loading;
