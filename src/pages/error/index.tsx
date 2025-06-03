import { Link } from 'react-router'

const ErrorPage = () => {
  return (
    <div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
      <h1 className='font-bold text-6xl mb-2'>404</h1>
      <h1 className='font-bold text-4xl mb-4'>Page not found</h1>
      <p className='italic text-1xl mb-4'>You have landed on a page that does not exist</p>

      <Link to="/" className='bg-gray-50/20 py-1 px-4 rounded-md'>Back to Home</Link>
    </div>
  )
}

export default ErrorPage