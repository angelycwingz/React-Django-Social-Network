import { Flex, Heading, VStack, Field, Input,Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { create_post } from '@/api/endpoints'
import { useNavigate } from 'react-router-dom'

function CreatePost() {

    const [description, setDescription] = useState('')
    const nav = useNavigate()

    const handlePost = async () => {
        try {
            const response = await create_post(description)
            if(response){
                nav('/')
            } else {
                console.log("create post handle :: ", response)
            }
        } catch (error) {
            console.log(error);
            
            alert('error creating post')
        }
    }

  return (
    <Flex w='100%' h='100%' justify='center' pt='50px'>
        <VStack w='95%' maxW='450px' align='start' gap='40px'>
            <Heading>Create Post</Heading>
            <Field.Root>
                <Field.Label>Scrap</Field.Label>
                <Input type='text' bg='white'
                value={description} onChange={(e) => setDescription(e.target.value)} />
            </Field.Root>
            <Button onClick={handlePost} colorPalette='blue' w='100%'>Create Post</Button>
        </VStack>
    </Flex>
  )
}

export default CreatePost