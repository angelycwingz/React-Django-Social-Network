import { Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { IoPersonOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";


function Navbar() {
    const nav = useNavigate()

    const handleNavigate = (route) => {
        nav(`/${route}`)
    }

    const handleNavigateUser = () => {
        const username = JSON.parse(localStorage.getItem('userData'))['username']
        nav(`/${username}`)
        window.location.reload()
    }

  return (
    <Flex justify="center" align='center' w='100vw' h='90px' bg='blue.600'>
        <HStack w='90%' justifyContent='space-between' color='white'>
            <Text cursor='pointer' fontSize='24px' fontWeight='bold' onClick={(route)=> handleNavigate('')}>SocialHub</Text>
            <HStack gap='20px' alignItems='center'>
                <Text cursor='pointer' onClick={handleNavigateUser}><IoPersonOutline size='22px' /></Text>
                <Text cursor='pointer' onClick={(route)=> handleNavigate('create/post')}><IoCreateOutline size='24px' /></Text>
                <Text cursor='pointer' onClick={(route)=> handleNavigate('')}><FaHouse size='22px' /></Text>
                <Text cursor='pointer' onClick={(route)=> handleNavigate('search/')}><IoSearch size='22px' /></Text>
                <Text cursor='pointer' onClick={(route)=> handleNavigate('settings/')}><IoIosSettings size='24px' /></Text>
            </HStack>
        </HStack>
    </Flex>
  )
}

export default Navbar