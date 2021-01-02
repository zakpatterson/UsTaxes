import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import { Button, Box } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom"
import { useForm } from 'react-hook-form'

export default function StartPage() {
    const { handleSubmit } = useForm()
    const history = useHistory()

    const onSubmit = formData => { 
        history.push("w2employerinfo")
    }
    return (
        <Box display="flex" justifyContent="center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" justifyContent="flex-start">
                    <h2>Employee Information</h2>
                </Box>
                <Box display="flex" justifyContent="flex-start">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Box>
                <Box display="flex" justifyContent="flex-start" paddingTop={2}>
                    <Button variant="outlined" size="large" color="secondary" href="https://github.com/thegrims/UsTaxes/tree/development">
                            <GitHubIcon></GitHubIcon>
                    </Button>
                </Box>
                <Box display="flex" justifyContent="flex-start" paddingTop={2} paddingBottom={1}>
                    <Button component={Link} to={"w2employerinfo"} variant="contained" color="primary">
                        Get Started
                    </Button>
                </Box>
            </form>
        </Box>
                    
    )
}