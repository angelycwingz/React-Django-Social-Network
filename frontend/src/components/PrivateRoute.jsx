import React from 'react'
import { useAuth } from '@/contexts/useAuth'
import { Navigate } from 'react-router-dom'
import { Text } from '@chakra-ui/react';

function PrivateRoute({children}) {
  const {auth, authLoading} = useAuth();

  if(authLoading){
    return <Text>Loading....</Text>
  }

  if (auth) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}

export default PrivateRoute