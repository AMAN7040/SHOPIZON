import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='text-red-600'>
      <h2>Not Found</h2>
      <p className='text-[1rem]'>Could not find requested resource</p>
      <Link className='text-blue-500' href="/">Back To Home</Link>
    </div>
  )
}