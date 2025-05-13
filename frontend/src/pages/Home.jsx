import { get_posts } from '@/api/endpoints'
import { Heading, VStack, Text, Flex, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Post } from '../components/index'

function Home() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPage, setNextPage] = useState(1)

    const fetchData = async () => {
        const data = await get_posts(nextPage)
        setPosts([...posts, ...data.results])
        setNextPage(data.next? nextPage+1: null)
    }

    useEffect( ()=>{ 
        try{
            fetchData()
        } catch {
            alert('error getting posts')
        } finally {
            setLoading(false)
        }
    }, [])

    const loadMorePosts = () => {
        if (nextPage) {
            fetchData()
        }
    }

  return (
    <Flex w='100%' justify='center' pt='50px'>
        <VStack align='start' gap='20px' pb='50px'>
            <Heading size='3xl' fontWeight='bold'>Posts</Heading>
            {
                loading?
                <Text>Loading....</Text>
                :
                    posts ?
                        posts.map((post) =>(
                        <Post key={post.id} id={post.id} username={post.username} description={post.description} formatted_date={post.formatted_date} liked={post.liked} like_count={post.like_count}/>
                    ))
                    :
                    {}
            }

            {
                nextPage && !loading && (
                    <Button colorPalette='blue' onClick={loadMorePosts} w='100%'>Load More</Button>
                )
            }

        </VStack>
    </Flex>
  )
}

export default Home