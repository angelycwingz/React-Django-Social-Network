import { VStack, Text, HStack, Flex, Box } from '@chakra-ui/react'
import React, { useState } from 'react'

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { toggleLike } from '@/api/endpoints';

function Post({id, username, description, formatted_date, liked, like_count}) {

  const [clientLiked, setClientLiked] = useState(liked)
  const [clientLikeCount, setClientLikeCount] = useState(like_count)

  const handleToggleLike = async () => {
    const data = await toggleLike(id)
    if (data.now_liked){
      setClientLiked(true)
      setClientLikeCount(clientLikeCount + 1)
    } else {
      setClientLiked(false)
      setClientLikeCount(clientLikeCount - 1)
    }
  }

  return (
    <VStack w='400px' h='400px' border='1px solid' borderColor='gray.400' borderRadius='8px'>
       <HStack w='100%' flex='1' borderBottom='1px solid' borderColor='gray.300' p='0 20px' bg='gray.50' borderRadius='8px 8px 0 0'>
        <Text>@{username}</Text>
       </HStack>
       <Flex flex='6' w='100%' h='100%' justify='center' align='center'>
        <Text textAlign='center'>{description}</Text>
       </Flex>
       <Flex flex='2' w='100%' justify='center' align='center' bg='gray.50' borderTop='1px solid' borderColor='gray.400' borderRadius='0 0 8px 8px'>
        <HStack w='90%' justify='space-between'>
          <HStack>
            <Box>
              { clientLiked ? 
                <Box color='red'>
                  <FaHeart onClick={handleToggleLike} /> 
                </Box>
                : 
                <FaRegHeart onClick={handleToggleLike} />
              }
            </Box>
            <Text>{clientLikeCount}</Text>
          </HStack>
          <Text>{formatted_date}</Text>
        </HStack>
       </Flex>
    </VStack>
  )
}

export default Post