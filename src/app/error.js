'use client'

export default function errorPage({error}){
    return  <p className="text-center text-red-600">{error.message}</p>
}