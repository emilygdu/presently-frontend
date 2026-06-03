import { Flex, Title, Button, Text } from "@mantine/core";
import SellIcon from '@mui/icons-material/Sell';

const MarkAsBought = ({wish, searchedUser, onClose, onSuccess, token}) => {

    const handleSubmit = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/wishlist/items/${id}/bought`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            onSuccess()
            onClose()
        } catch (error) {
            console.error("Error posting wish:", error);
        }
    }

    return (  
        <Flex w="37vw" h="40vh" direction="column" align="center" justify="center">
            <Title c="#5682B4" fz={35} mb={40} mt={-30} ta="center">
                Wunsch als gekauft markieren
            </Title>
            <Text c="#5682B4" fz={25} mb={40} ta="center" px={25}>
                Haben Sie das Geschenk mit dem Titel: "{wish.title}" für {searchedUser.username} gekauft?
            </Text>
            <Flex w="100%" justify="center" mt={10} mb={-30}>
                <Button w="49%" h={45} bg="#5682B4" c="#D5EAF5" fz="18px" onClick={() => handleSubmit(wish.id)}
                        leftSection={<SellIcon style={{marginRight: "15px", transform: 'rotate(90deg)' }}/>}
                >
                    Geschenk gekauft
                </Button>
            </Flex>
        </Flex>
    );
}
 
export default MarkAsBought;