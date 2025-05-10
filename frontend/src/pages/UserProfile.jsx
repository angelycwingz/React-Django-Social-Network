import React, { useEffect, useState } from "react";
import { Flex, Text, VStack, Box, Heading, HStack, Image, Button } from "@chakra-ui/react";
import { get_user_profile_data } from "@/api/endpoints";
import { SERVER_URL } from "@/constants/constants";

function UserProfile(){

    const get_username_from_url = () => {
        const url_split = window.location.pathname.split('/')
        return url_split[url_split.length-1]
    }

    const [username, setUsername] = useState(get_username_from_url())

    useEffect(()=> {
        setUsername(get_username_from_url())
    }, [])

    return(
        <Flex w='100%' justify='center'>
            <VStack w='75%'>
                <Box w='100%' mt='40px'>
                    <UserDetails username={username} />
                </Box>
            </VStack>
        </Flex>
    )
}


function UserDetails({username}){

    const [loading, setLoading] = useState(true)
    const [bio, setBio] = useState('')
    const [profileImage, setProfileImg] = useState('')
    const [followerCount, setFollowerCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)


    useEffect(()=>{
        
        const fetchData = async () => {
            try {
                const data = await get_user_profile_data(username)
                console.log(data)
                setProfileImg(data.profile_image)
                setFollowerCount(data.follower_count)
                setFollowingCount(data.following_count)
                setBio(data.bio)
            } catch (error) {
                console.log('error :: fetchdata ::', error)
            } finally{ 
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return(
        <VStack w='100%' align='start' gap='40px'>
            <Heading>@{username}</Heading>
            <HStack gap='20px'>
                <Box boxSize='150px' border='2px solid' borderColor='gray.700' bg='white' borderRadius='full' overflow='hidden'>
                    <Image src={loading ? "-" : `${SERVER_URL}${profileImage}`} boxSize='100%' objectFit='cover' />
                </Box>
                <VStack gap='20px'>
                    <HStack gap='20px' fontSize='18px'>
                        <VStack>
                            <Text>Followers</Text>
                            <Text>{ followerCount}</Text>
                        </VStack>
                        <VStack>
                            <Text>Following</Text>
                            <Text>{ loading ? "-" : followingCount }</Text>
                        </VStack>
                    </HStack>
                    <Button w='100' variant='subtle'>Edit Profile</Button>
                </VStack>
            </HStack>
            <Text fontSize='18px'>{ loading ? "..." : bio }</Text>
        </VStack>
    )
}

export default UserProfile