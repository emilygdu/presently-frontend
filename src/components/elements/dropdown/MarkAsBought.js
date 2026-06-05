import { Flex, Title, Button, Text, Image } from "@mantine/core";
import SellIcon from '@mui/icons-material/Sell';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

const MarkAsBought = ({wish, searchedUser, onClose, onSuccess, token}) => {

    const events = [
        {name: "Geburtstag", id: "BIRTHDAY"},
        {name: "Hochzeit", id: "WEDDING"},
        {name: "Weihnachten", id: "CHRISTMAS"},
        {name: "Abschluss", id: "GRADUATION"}
    ]

    const categorys = [
        {name: "Haushalt", id: "HOME"},
        {name: "Kleidung", id: "FASHION"},
        {name: "Kosmetik", id: "BEAUTY"},
        {name: "Lebensmittel", id: "FOOD"},
        {name: "Reisen", id: "TRAVEL"},
        {name: "Sport", id: "SPORT"},
        {name: "Technik", id: "TECHNOLOGY"},
        {name: "Sonstiges", id: "OTHER"}
    ]

    const handleSubmit = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/wishlist/items/${id}/bought`, {
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

    console.log(wish)

    return (  
        <Flex w="37vw" h="65vh" direction="column" align="center" justify="center">
            <Title c="#5682B4" fz={35} mb={20} mt={-30} ta="center">
                Wunschdetails
            </Title>
            <Image w="50%" h="27vh" src={wish.imageUrl} style={{ borderRadius: "15px" }} />
            {wish?.isFavorite && <Text c="#5682B4" fz={25} mb={10}>Dieser Artikel ist ein Favorit!</Text>}
            <Flex w="100%" justify="space-between" px={90}>
                <Text c="#5682B4" fz={25} >Titel:</Text>
                <Text c="#5682B4" fz={25}>{wish.title}</Text>
            </Flex>
            <Flex w="100%" justify="space-between" px={90}>
                <Text c="#5682B4" fz={25}>Preis:</Text>
                <Text c="#5682B4" fz={25}>{wish.price} €</Text>
            </Flex>
            <Flex w="100%" justify="space-between" px={90}>
                <Text c="#5682B4" fz={25}>Kategorie:</Text>
                <Text c="#5682B4" fz={25}>{categorys.find((cat) => cat.id == wish.productCategory).name}</Text>
            </Flex>
            {wish?.eventType != null && <Flex w="100%" justify="space-between" px={90}>
                <Text c="#5682B4" fz={25}>Event:</Text>
                <Text c="#5682B4" fz={25}>{events.find((event) => event.id == wish.eventType).name}</Text>
            </Flex>}
            <Flex w="100%" justify="center" mt={20} mb={-30}>
                <Button w="49%" h={45} c="#5682B4" bg="#D5EAF5" fz="18px" onClick={() => handleSubmit(wish.id)}
                        leftSection={<SellIcon style={{marginRight: "15px", transform: 'rotate(90deg)' }}/>}
                >
                    Als gekauft markieren
                </Button>
                <Button component="a" href={wish.productUrl} target="_blank" w="49%" h={45} bg="#5682B4" c="#D5EAF5" fz="18px" ml={10}
                        leftSection={<LocalGroceryStoreIcon style={{marginRight: "15px"}}/>}
                >
                    Link zum Artikel öffnen
                </Button>
            </Flex>
        </Flex>
    );
}
 
export default MarkAsBought;