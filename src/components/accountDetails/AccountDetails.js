import { Flex, Text, Button, Popover } from "@mantine/core";
import InputRow from "../elements/dropdown/InputRow";
import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import AccountDetailsDropdown from "../elements/dropdown/AccountDetailsDropdown";

const AccountDetails = ({token, setToken}) => {

    const navigate = useNavigate()

    const [opened, setOpened] = useState()
    const [errors, setErrors] = useState({});

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = "E-Mail ist erforderlich";
        if (!username) newErrors.username = "Benutzername ist erforderlich";
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
                setUserId(data.id)
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
            const response = await fetch(`http://localhost:8080/users/me`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username, 
                    email: email,
                    id: userId,
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate("/login")
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
                    <Flex w="100%" justify="space-between" mt={20}>
                        <Button w="49%" h={40} bg="#F5F4D7" c="#5682B4" fz="18px"
                                leftSection={<LogoutIcon />} onClick={() => setToken()}
                        >
                            Ausloggen
                        </Button>
                        <Popover opened={opened} onChange={setOpened} withOverlay overlayProps={{ zIndex: 10, blur: '5px' }} zIndex={11}>
                            <Popover.Target>
                                <Button w="49%" h={40} bg="#5682B4" c="#D5EAF5" fz="18px"
                                        leftSection={<EditIcon />} onClick={() => setOpened(true)}
                                >
                                    Daten bearbeiten
                                </Button>
                            </Popover.Target>
                            <Popover.Dropdown style={{position: "fixed", top: "55%", left: "50%", transform: "translate(-50%, -50%)",
                                                    border: "7px solid #5682B4", backgroundColor: "#FEFDE5", borderRadius: 12, padding: 20}}>
                                <AccountDetailsDropdown onClick={() => handleSubmit()}/>
                            </Popover.Dropdown>
                        </Popover>
                    </Flex>
                </Flex>
            </Flex>       
        </Flex>
    );
}
 
export default AccountDetails;