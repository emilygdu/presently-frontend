import { Flex, Image, Text, Button, Popover, Box, Badge } from "@mantine/core";
import StarIcon from '@mui/icons-material/Star';
import { useState, useEffect } from "react";
import MarkAsBought from "../elements/dropdown/MarkAsBought";
import SellIcon from '@mui/icons-material/Sell';

const WishBox = ({wish, onSuccess, searchedUser, token}) => {

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
    const events = [
        {name: "Geburtstag", id: "BIRTHDAY"},
        {name: "Hochzeit", id: "WEDDING"},
        {name: "Weihnachten", id: "CHRISTMAS"},
        {name: "Abschluss", id: "GRADUATION"}
    ]
    const [opened, setOpened] = useState()
    const formatPrice = (num) => num.toLocaleString("de-DE", {minimumFractionDigits: 2, maximumFractionDigits: 2,})

    return (  
        <Flex direction="column" bg="#F5F4D7" w="17vw" h="37vh" style={{ border: "5px solid #5682B4", borderRadius: "20px", cursor: wish.bought ? "default" : "pointer", position: "relative"}}>
            {wish.isBought && (
                <Flex direction="column" pb={140} style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "100%", height: "100%",
                    backgroundColor: "rgba(152, 152, 152, 0.75)",
                    borderRadius: "15px",
                    zIndex: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text fw={600} fz={25} c="#F5F4D7">Bereits</Text>
                    <Text fw={600} fz={25} c="#F5F4D7">Gekauft</Text>
                </Flex>
            )}
            <Box style={{ position: "relative" }}>
                <Image onClick={() => window.open(wish.productUrl, '_blank')} w="100%" h="10vw" src={wish.imageUrl} style={{ borderRadius: "15px" }} />
                {!wish.isBought &&
                    <Popover opened={opened} onChange={setOpened} withOverlay overlayProps={{ zIndex: 10, blur: '5px' }} zIndex={11}>
                        <Popover.Target>
                            <Button onClick={() => setOpened(true)} ta="center" radius={20} w={20}
                                style={{ position: "absolute", top: 4, left: 4, display: "flex", alignItems: "center", justifyContent: "center"}}
                                bg="#D5EAF5" c="#5682B4"
                            >
                                <SellIcon style={{ transform: 'rotate(90deg)' }}/>
                            </Button>
                        </Popover.Target>
                        <Popover.Dropdown style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                                                    border: "7px solid #5682B4", backgroundColor: "#FEFDE5", borderRadius: 12, padding: 20}}>
                            <MarkAsBought wish={wish} searchedUser={searchedUser} onClose={() => setOpened(false)} onSuccess={onSuccess} token={token}/>
                        </Popover.Dropdown>
                    </Popover>
                }
                {wish.eventType &&
                    <Badge ta="center"
                        style={{ position: "absolute", top: 4, right: 4, display: "flex", alignItems: "center", justifyContent: "center"}}
                        bg="#D5EAF5" c="#5682B4"
                    >
                        {events?.find((e) => e.id == wish.eventType)?.name}
                    </Badge>
                }
            </Box>
            <Text onClick={() => window.open(wish.productUrl, '_blank')} ml={5} size="sm" c="#5682B4">{categorys?.find((category) => category.id == wish.productCategory).name}</Text>
            <Flex onClick={() => window.open(wish.productUrl, '_blank')} c="#5682B4" align="center" justify="center" h="10vh">
                <Text fw={700} ta="center" w="12vw" size="xl">{wish.title}</Text>
            </Flex>
            <Flex onClick={() => window.open(wish.productUrl, '_blank')} c="#5682B4" align="end" justify="space-between" h="10vh" px={10} mb={10}>
                <Text align="center">{wish.isFavorit ? <StarIcon sx={{ fontSize: 30 }} /> : ""}</Text>
                <Button component="a" href={wish.productUrl} target="_blank" c="#D5EAF5"  fz={18} radius={20} px={15} ta="center" bg="#5682B4">{formatPrice(wish.price)} €</Button>
            </Flex>
        </Flex>
    );
}
 
export default WishBox;