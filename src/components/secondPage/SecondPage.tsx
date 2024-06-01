import React from 'react'
import Header from '../common/Header'
import { useAppSelector } from '../../app/storeType'

const SecondPage = () => {
  const user = useAppSelector((state) => state.user.user)

  return (
    <>
    <Header />
    <div>SecondPage</div>
    </>
  )
}

export default SecondPage