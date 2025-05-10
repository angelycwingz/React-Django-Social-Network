import { Flex, VStack, Field, Input, Button, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {login} from '../api/endpoints.js'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate()

    const handleLogin = async () => {
        if(!username || !password){
            return ;  // do nothing
        } 

        const data = await login(username, password)
        console.log(data);
        
        if (data.success){
            nav(`/${username}`)
        } else {
            alert("Invalid username and password")
        }
        
    }

    const handleNav = () => {
        nav('/register')
    }


  return (
    <Flex w='100%' h='calc(100vh - 100px)' justify='center' align='center' >
        <VStack w='95%' maxW='400px' align='start' gap='30px'>
            <Heading size="3xl" fontWeight="bold">Login</Heading>
            <Field.Root>
                <Field.Label htmlFor='username'>Username</Field.Label>
                <Input bg='white' type='text' 
                value={username} onChange={(e)=> setUsername(e.target.value)}/>
            </Field.Root>
            <Field.Root>
                <Field.Label htmlFor='password'>Password</Field.Label>
                <Input bg='white' type='password' 
                value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </Field.Root>
            <VStack w='100%' gap='10px' align='start'>
                <Button w='100%' colorPalette='green'
                onClick={handleLogin} >Login</Button>
                <Stack direction="row">
                    <Text fontWeight="medium">Don't have an account? </Text>
                    <Text color="green.600" fontWeight="bold"

                    style={{cursor:'pointer'}}
                    onClick={handleNav}>Sign up</Text>
                </Stack>
            </VStack>
        </VStack>
    </Flex>
  )
}

export default Login