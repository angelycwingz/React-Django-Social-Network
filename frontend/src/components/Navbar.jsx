import { Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { IoPersonOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";

import { useAuth } from '@/contexts/UseAuth';


function Navbar() {
    const {username} = useAuth()
    const nav = useNavigate()

    const handleNavigate = (route) => {
        nav(`/${route}`)
    }

  return (
    <Flex justify="center" align='center' w='100vw' h='90px' bg='blue.600'>
        <HStack w='90%' justifyContent='space-between' color='white'>
            <Text fontSize='24px' fontWeight='bold' onClick={(route)=> handleNavigate('')}>SocialHub</Text>
            <HStack gap='20px' alignItems='center'>
                <Text onClick={(route)=> handleNavigate(username)}><IoPersonOutline size='22px' /></Text>
                <Text onClick={(route)=> handleNavigate('create/post')}><IoCreateOutline size='24px' /></Text>
                <Text onClick={(route)=> handleNavigate('')}><FaHouse size='22px' /></Text>
            </HStack>
        </HStack>
    </Flex>
  )
}

export default Navbar