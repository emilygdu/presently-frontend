import { Flex, Title, Text, TextInput, Button, Anchor, PasswordInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import { useState, useEffect } from "react";
import { useForm } from '@mantine/form';
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

const Register = ({setToken}) => {

    const navigate = useNavigate();

    const [failText, setFailText] = useState(null);
    //const [userData, setUserData] = useState();

    const form = useForm({
        initialValues: {
            email: "",
            username: "",
            password: "",
            passwordCheck: "",
        },
        validate: {
            email: (value) => value.trim().length === 0 ? 'E-Mail ist erforderlich' : null,
            username: (value) => value.trim().length === 0 ? 'Username ist erforderlich' : null,
            password: (value) => value.trim().length === 0 ? 'Passwort ist erforderlich' : 
                                value.length < 8 ? 'Mindestens 8 Zeichen' : null,
            passwordCheck: (value, values) => value.trim().length === 0 ? 'Passwort ist erforderlich' : 
                                            value !== values.password ? 'Passwörter stimmen nicht überein' : null,
        }
    })

    const handleSubmit = async (values) => {
        fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            setToken(data.token)
            navigate('/meineWuensche')
        })
        .catch(error => {
            console.error('Error fetching data:', error)
        })
    }

    // function registerFunction (values) {
    //     const EmailInUse = userData.find((user) => user.email === values.email);
    //     const ExistingUsername = userData.find((user) => user.username === values.username);
    //     const failPass = values.password != values.passwordCheck;

    //     if (!EmailInUse && !ExistingUsername && !failPass) {
    //         handleSubmit(values)
    //         navigate(`/meineWuensche`)    
    //         setFailText(null)
    //     }
    //     if(EmailInUse) {
    //         setFailText("Die angegebene E-Mail ist bereits in Benutzung")
    //         return
    //     }
    //     if(ExistingUsername) {
    //         setFailText("Der Username ist bereits vergeben...")
    //         return
    //     }
    //     if(failPass) {
    //         setFailText("Das wiederholte Passwort ist falsch")
    //         return
    //     }
    // }

    return (
        <Flex direction="column" h="100vh" w="100vw" justify="center" align="center" bg="#D5EAF5">
            <Flex align="baseline" mb={20}>
                <Title fz={60} fw={500} c="#5682B4">Presently</Title>
                <Title fz={40} fw={500} c="#5682B4">- Schenken, was gewünscht wird</Title>
            </Flex>
            <Flex direction="column" bg="#F5F4D7" mt={20} w="40vw" justify="center" align="center" style={{border: "7px solid #5682B4",boxShadow: "5px 5px 20px #5682B4", backgroundColor: "#FEFDE5", borderRadius: 12, padding: 20}}>
                <Title c="#5682B4" fz={40} fw={500} mt={10} mb={30}>
                    Registrieren
                </Title>
                {failText != null && 
                    <Text w="25vw" c="#5682B4" ta="center" fz={17}>
                        {failText}
                    </Text>
                }
                <form onSubmit={(form.onSubmit(handleSubmit))}>
                    <Flex w="30vw" justify="space-between" my={20}>
                        <Text fz={20} c="#5682B4">E-Mail:</Text>
                        <TextInput type="email" w="13vw" {...form.getInputProps("email")}/>
                    </Flex>
                    <Flex w="30vw" justify="space-between" my={20}>
                        <Text fz={20} c="#5682B4">Username:</Text>
                        <TextInput w="13vw" {...form.getInputProps("username")}/>
                    </Flex>
                    <Flex w="30vw" justify="space-between" my={20}>
                        <Text fz={20} c="#5682B4">Passwort:</Text>
                        <PasswordInput w="13vw" {...form.getInputProps("password")}/>
                    </Flex>
                    <Flex w="30vw" justify="space-between" my={20}>
                        <Text fz={20} c="#5682B4">Passwort wiederholen:</Text>
                        <PasswordInput w="13vw" {...form.getInputProps("passwordCheck")}/>
                    </Flex>
                    <Flex justify="center">
                        <Button type="submit" w="12vw" bg="#5682B4" mb={20} mt={10} leftSection={<LoginIcon style={{marginRight: 10}}/>}>
                            Account anlegen
                        </Button>
                    </Flex>
                </form>
                <Anchor onClick={() => navigate("/login")} target="_blank" underline="hover" c="#5682B4" mb={20}>
                    Sie haben schon einen Account?
                </Anchor>
            </Flex>
        </Flex>  
    );
}
 
export default Register;