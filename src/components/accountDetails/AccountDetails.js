import { Flex, Text, Button } from "@mantine/core";
import InputRow from "../elements/dropdown/InputRow";
import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const AccountDetails = ({token, setToken}) => {

    const navigate = useNavigate()

    const { setCurrentUser } = useUser();
    const { currentUser } = useUser();

    const [errors, setErrors] = useState({});

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = "E-Mail ist erforderlich";
        if (!username) newErrors.username = "Benutzername ist erforderlich";
        if (!password) newErrors.password = "Passwort ist erforderlich";
        return newErrors;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setEmail(data.email)
                setUsername(data.username)
            } catch (error) {
                console.error(`Error fetching url:`, error)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const response = await fetch(`http://localhost:8000/users/${currentUser}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username, 
                    email: email,
                    password: password,
                    id: currentUser,
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate("/meineWuensche")
        } catch (error) {
            console.error("Error posting wish:", error);
        }
    }

    return (  
        <Flex px={50} py={50} w="100vw" h="90vh" justify="center" align="center">
            <Flex p={30} justify="center" align="center" w="40vw" direction="column" ta="center" bg="#FEFDE5" style={{ borderRadius: 12, border: "7px solid #5682B4" }}>
                <Text c="#5682B4" size="40px" mb={40}>
                    Mein Konto
                </Text>  
                <Flex w="100%" justify="center" direction="column" ta="center" align="center"> 
                    <InputRow title="E-Mail" inputType="text" value={email} onChange={setEmail} error={errors.email}/>
                    <InputRow title="Benutzername" inputType="text" value={username} onChange={setUsername} error={errors.username}/>
                    <InputRow title="Passwort" inputType="password" value={password} onChange={setPassword} error={errors.password}/>
                    <Flex w="100%" justify="space-between" mt={10}>
                        <Button w="49%" h={40} bg="#F5F4D7" c="#5682B4" fz="18px"
                                leftSection={<LogoutIcon />} onClick={() => setToken()}
                        >
                            Ausloggen
                        </Button>
                        <Button w="49%" h={40} bg="#5682B4" c="#D5EAF5" fz="18px"
                                leftSection={<EditIcon />} onClick={() => handleSubmit()}
                        >
                            Daten bearbeiten
                        </Button>
                    </Flex>
                </Flex>
            </Flex>       
        </Flex>
    );
}
 
export default AccountDetails;