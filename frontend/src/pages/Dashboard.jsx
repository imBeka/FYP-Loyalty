import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const {user} = useSelector(
      (state) => state.auth
  )


  const navigate = useNavigate()

  useEffect(() => {
      if(!user) {
          navigate('/login')
      }

  }, [user, navigate])

  return (
    <>
      <h1>Welcome, { user && user.name }</h1>
      Dashboard
    </>
  )
}

export default Dashboard