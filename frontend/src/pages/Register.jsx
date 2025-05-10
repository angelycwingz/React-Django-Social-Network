import { Flex, VStack, Field, Input, Button, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {register} from '../api/endpoints.js'
import { useNavigate } from 'react-router-dom'

function Register() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const nav = useNavigate()

    const handleRegister = async () => {
        if(!username || !email || !firstName || !lastName ||!password || !confirmPassword){
            return ;  // do nothing
        } 
        if(password===confirmPassword){
            try {
                await register (username, email, firstName, lastName, password)
                alert('User registered successfully')
                nav('/login')
            } catch (error) {
                alert('error registering')
            }

        } else {
            alert("Password and Confirm Password do not match")
        }        
    }

    const handleNav = () => {
        nav('/login')
    }

  return (
    <Flex w='100%' h='calc(100vh - 100px)' justify='center' align='center' >
        <VStack w='95%' maxW='400px' align='start' gap='20px'>
            <Heading size="3xl" fontWeight="bold">Register</Heading>
            <Field.Root>
                <Field.Label htmlFor='username'>Username</Field.Label>
                <Input bg='white' type='text' 
                value={username} onChange={(e)=> setUsername(e.target.value)}/>
            </Field.Root>
            <Field.Root>
                <Field.Label htmlFor='email'>Email</Field.Label>
                <Input bg='white' type='email' 
                value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </Field.Root>
            <Field.Root>
                <Field.Label htmlFor='firstName'>First Name</Field.Label>
                <Input bg='white' type='text' 
                value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
            </Field.Root>
            <Field.Root>
                <Field.Label htmlFor='LastName'>Last Name</Field.Label>
                <Input bg='white' type='text' 
                value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
            </Field.Root>
            <Field.Root>
                <Field.Label htmlFor='Password'>Password</Field.Label>
                <Input bg='white' type='password' 
                value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </Field.Root>
            <Field.Root>
                <Field.Label htmlFor='confirmPassword'>Confirm Password</Field.Label>
                <Input bg='white' type='password' 
                value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
            </Field.Root>
            <VStack w='100%' gap='10px' align='start'>
                <Button w='100%' colorPalette='green'
                onClick={handleRegister} >Register</Button>
                <Stack direction="row">
                    <Text fontWeight="medium">Already have an account? </Text>
                    <Text color="green.600" fontWeight="bold"

                    style={{cursor:'pointer'}}
                    onClick={handleNav}>Log in</Text>
                </Stack>
            </VStack>
        </VStack>
    </Flex>
  )
}

export default Register