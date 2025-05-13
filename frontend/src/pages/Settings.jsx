import { logout, update_user } from '@/api/endpoints'
import { Flex, VStack, Field, Text, Button, Heading, Input, HStack, Box, Image, Textarea, AlertTitle } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Settings() {

    const storage =JSON.parse(localStorage.getItem('userData'))

    const [username, setUsername] = useState(storage ? storage.username : '')
    const [email, setEmail] = useState(storage ? storage.email : '')
    const [first_name, setFirst_name] = useState(storage ? storage.first_name : '')
    const [last_name, setLast_name] = useState(storage ? storage.last_name : '')
    const [bio, setBio] = useState(storage ? storage.bio : '')
    const [profile_image, setProfile_image] = useState(storage ? storage.profile_image : '')

    const nav = useNavigate()

    const handleLogout = async() =>{
        try {
            await logout()
            nav('/login')
        } catch (error) {
            alert("error logging out")
        }
    }

    const handleUpdate = async() => {
        try{
            await update_user({'username': username, 'profile_image': profile_image, 'email': email, 'first_name': first_name, 'last_name': last_name, 'bio': bio})
            localStorage.setItem('userData', JSON.stringify({'username': username, 'email': email, 'first_name': first_name, 'last_name': last_name, 'bio': bio}))
            alert('Profile update successfully')
        } catch {
            alert('error updating details')
        }
    }

  return (
    <Flex w='100%' justify='center' pt='50px'>
        <VStack w='95%' maxW='500px' align='start' gap='20px'>
            <Heading size='3xl' fontWeight='bold'>Settings</Heading>
            <VStack w='100%' align='start' gap='10px'>
                <Field.Root>
                    <Field.Label>Profile Picture</Field.Label>
                    <input bg='white' type='file' 
                    onChange={(e) => setProfile_image(e.target.files[0])}/>
                </Field.Root>
                <Field.Root>
                    <Field.Label>Username</Field.Label>
                    <Input bg='white' type='text' 
                    value={username} onChange={(e) => setUsername(e.target.value)}/>
                </Field.Root>
                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input bg='white' type='email' 
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Field.Root>
                <Field.Root>
                    <Field.Label>First Name</Field.Label>
                    <Input bg='white' type='text' 
                    value={first_name} onChange={(e) => setFirst_name(e.target.value)}/>
                </Field.Root>
                <Field.Root>
                    <Field.Label>Last Name</Field.Label>
                    <Input bg='white' type='text' 
                    value={last_name} onChange={(e) => setLast_name(e.target.value)}/>
                </Field.Root>
                <Field.Root>
                    <Field.Label>Bio</Field.Label>
                    <Textarea bg='white' type='text' 
                    value={bio} onChange={(e) => setBio(e.target.value)}/>
                </Field.Root>
                <Button onClick={handleUpdate} w='100%' colorPalette='blue' mt='10px'>Save Changes</Button>
            </VStack>
            <Button onClick={handleLogout} colorPalette='red'>Logout</Button>
        </VStack>
    </Flex>
  )
}

export default Settings