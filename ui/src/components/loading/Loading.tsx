type LoadingProps = {
    message?: string
}
export const Loading = ({message}:LoadingProps) =>{
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 bg-gray-700 bg-opacity-75 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-12 mb-4"></div>
      <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
      <p className="w-1/3 text-center text-white">{message? message:"This may take a few seconds, please don't close this page."}</p>
    </div>
  );
}