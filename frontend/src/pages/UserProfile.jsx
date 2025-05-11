import React, { useEffect, useState } from "react";
import { Flex, Text, VStack, Box, Heading, HStack, Image, Button,Spacer } from "@chakra-ui/react";
import { get_user_profile_data, get_users_posts, toggle_follow } from "@/api/endpoints";
import { SERVER_URL } from "@/constants/constants";
import { Post } from "../components/index.js";

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
                <Box w='100%' mt='50px'>
                    <UserPosts username={username} />
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

    const [isOurProfile, setIsOurProfile] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    const handleToggleFollow = async() => {
        console.log("userProfile :: getting data")
        const data = await toggle_follow(username)
        console.log("userProfile :: ", data)
        if(data.now_following){
            setFollowerCount(followerCount + 1)
            setIsFollowing(true)
        } else {
            setFollowerCount(followerCount - 1)
            setIsFollowing(false)
        }
    }

    useEffect(()=>{
        
        const fetchData = async () => {
            try {
                const data = await get_user_profile_data(username)
                console.log(data)
                setBio(data.bio)
                setProfileImg(data.profile_image)
                setFollowerCount(data.follower_count)
                setFollowingCount(data.following_count)
                
                setIsOurProfile(data.is_our_profile)
                setIsFollowing(data.is_following)
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
                    { 
                        loading?
                            <Spacer />
                        :

                            isOurProfile ? 
                                <Button w='100%' variant='subtle' size='sm'>Edit Profile</Button>
                            :
                                <Button onClick={handleToggleFollow} colorPalette='blue' w='100%' size='sm'>{isFollowing ? 'Unfollow' : 'Follow' }</Button>
                    }
                </VStack>
            </HStack>
            <Text fontSize='18px'>{ loading ? "..." : bio }</Text>
        </VStack>
    )
}


function UserPosts({username}){
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true) 


    useEffect(()=>{

        const fetchPosts = async () => {
            try {
                const posts = await get_users_posts(username)
                console.log(posts)
                setPosts(posts)
            } catch (error) {
                alert('error getting user posts')
                
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()

    }, [])


    return(
        <Flex w='100%' wrap='wrap' gap='30px' pb='50px'>
            { loading ?
             <Text>Loading....</Text>
            :    
                ( posts?
                    
                       posts.map((post) => (

                        <Post
                        key={post.id} id={post.id} username={post.username} description={post.description} formatted_date={post.formatted_date} liked={post.liked} like_count={post.like_count}>

                        </Post>
                       ))
                    
                :
                    {}
                )
            }
        </Flex>
    )
}






export default UserProfile