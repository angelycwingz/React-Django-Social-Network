import React, { useState } from 'react'
import { Flex, VStack, Text, Button, Heading, Input, HStack, Box, Image } from '@chakra-ui/react'
import { search_users } from '@/api/endpoints'
import { SERVER_URL } from '@/constants/constants'
import { useNavigate } from 'react-router-dom'

function Search() {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])

    const handleSearch = async() =>{
        const users = await search_users(search)
        setUsers(users)
    }


    return (
    <Flex w='100%' justify='center' pt='50px'>
        <VStack w='95%' maxW='500px' align='start' gap='20px'>
            <Heading size='3xl' fontWeight='bold'>Search Users</Heading>
            <HStack w='100%' gap='0px'>
                <Input bg='white' type='text'
                value={search} onChange={(e) => setSearch(e.target.value)}/>
                <Button colorPalette='blue'
                onClick={handleSearch}>Search</Button>
            </HStack>  
            <VStack w='100%'>
                {
                    users.map((user) => (
                        <UserProfile key={user.username} username={user.username} profile_image={user.profile_image} first_name={user.first_name} last_name={user.last_name} />
                    )) }
            </VStack>
        </VStack>

    </Flex>
    )
}


function UserProfile({username, profile_image, first_name, last_name}) {

    const nav = useNavigate()

    const handleNav = () => {
        nav(`/${username}`)
    }

    return(
        <Flex w='100%' h='100px' border='1px solid' borderColor='gray.300' borderRadius='8px' bg='white' justify='center' align='center'
        onClick={handleNav} cursor='pointer'>
            <HStack w='90%' gap='20px' align='center' >
                <Box boxSize='70px' borderRadius='full' overflow='hidden' bg='white' border='1px solid'>
                    <Image src={`${SERVER_URL}${profile_image}`} boxSize='100%' objectFit='cover'/>
                </Box>
                
                <VStack align='start' gap='3px'>
                    <Text fontWeight='medium'>{first_name} {last_name}</Text>
                    <Text color='gray.600' fontSize='15px'>@{username}</Text>
                </VStack>
            </HStack>
        </Flex>
    )
}

export default Search