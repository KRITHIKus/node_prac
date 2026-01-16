import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage(err) {
  return (
    <>
    
    <div>{err}</div>
    <Link className='btn btn-dark' to='/dash'>Retun to dashboard</Link>
    </>
  )
}
