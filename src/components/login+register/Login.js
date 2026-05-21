import { Flex, Title, Text, TextInput, Button, Anchor, PasswordInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import { useState, useEffect } from "react";
import { useForm } from '@mantine/form';
import { useUser } from "../../UserContext";

const Login = ({setToken}) => {

    const navigate = useNavigate()

    const { setCurrentUser } = useUser();

    const [noUser, setNoUser] = useState(false);
    const [userData, setUserData] = useState();

    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        },
        validate: {
            username: (value) => value.trim().length === 0 ? 'E-Mail ist erforderlich' : null,
            password: (value) => value.trim().length === 0 ? 'Passwort ist erforderlich' : null,
        }
    })

    //Funktionalität, die bei Versuch des einloggens ausgeführt wird
    function loginFunction (values) {
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
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
            setNoUser(false)
        })
        .catch(error => {
            console.error('Error fetching data:', error)
            setNoUser(true)
        })
    }

    return (
        <Flex direction="column" h="100vh" w="100vw" justify="center" align="center" bg="#D5EAF5">
            <Flex align="baseline" mb={20}>
                <Title fz={60} fw={500} c="#5682B4">Presently</Title>
                <Title fz={40} fw={500} c="#5682B4">- Schenken, was gewünscht wird</Title>
            </Flex>
            <Flex direction="column" bg="#F5F4D7" mt={20} w="35vw" justify="center" align="center" 
                  style={{border: "7px solid #5682B4",boxShadow: "5px 5px 20px #5682B4", backgroundColor: "#FEFDE5", borderRadius: 12, padding: 20}}
            >
                <Title c="#5682B4" fz={40} fw={500} mt={10} mb={30}>
                    Login
                </Title>
                {noUser && 
                    <Text w="25vw" c="#5682B4" ta="center" fz={17}>
                        Keinen User mit diesen Daten gefunden! Versuchen Sie es erneut...
                    </Text>
                }
                <form onSubmit={(form.onSubmit(loginFunction))}>
                    <Flex w="25vw" justify="space-between" my={20}>
                        <Text fz={20} c="#5682B4">Benutzername:</Text>
                        <TextInput w="13vw" {...form.getInputProps("username")}/>
                    </Flex>
                    <Flex w="25vw" justify="space-between" my={20}>
                        <Text fz={20} c="#5682B4">Passwort:</Text>
                        <PasswordInput w="13vw" {...form.getInputProps("password")}/>
                    </Flex>
                    <Flex justify="center">
                        <Button type="submit" w="12vw" bg="#5682B4" mb={20} mt={10} 
                                leftSection={<LoginIcon style={{marginRight: 30}}/>}
                        >
                            Login
                        </Button>
                    </Flex>
                </form>
                <Anchor onClick={() => navigate("/register")} target="_blank" underline="hover" c="#5682B4" mb={20}>
                    Sie haben noch keinen Account?
                </Anchor>
            </Flex>
        </Flex>  
    );
}
 
export default Login;