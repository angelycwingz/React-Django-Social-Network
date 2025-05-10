import { Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { IoPersonOutline } from "react-icons/io5";


function Navbar() {

    const nav = useNavigate()

    const handleNavigate = (route) => {
        nav(`/${route}`)
    }

  return (
    <Flex justify="center" align='center' w='100vw' h='90px' bg='blue.600'>
        <HStack w='90%' justifyContent='space-between' color='white'>
            <Text fontSize='24px' fontWeight='bold'>SocialHub</Text>
            <HStack>
                <Text onClick={(route)=> handleNavigate('aadi')}><IoPersonOutline size='22px' /></Text>
            </HStack>
        </HStack>
    </Flex>
  )
}

export default Navbar