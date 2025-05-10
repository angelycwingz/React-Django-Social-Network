import { Stack, Box } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "./index";

function Layout({children}){
    return(
        <Stack w='100vw' minH='100vh' bg='#FCFCFC'>
            <Navbar />
            <Box W='100%'>
                {children}
            </Box>
        </Stack>
    )
}

export default Layout