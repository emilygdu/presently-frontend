import { Flex, Title, Button, Text } from "@mantine/core";
import EditIcon from '@mui/icons-material/Edit';

const AccountDetailsDropdown = ({onClick}) => {

    return (  
        <Flex w="45vw" h="45vh" direction="column" align="center" justify="center">
            <Title c="#5682B4" fz={35} mb={40} mt={-30} ta="center">
                Daten wirklich verändern?
            </Title>
            <Text c="#5682B4" fz={25} mb={40} ta="center" px={25}>
                Wollen Sie wirklich ihre Daten anpassen? Sie werden automatisch ausgeloggt und müssen sich mit den angepassten Daten erneut anmelden.
            </Text>
            <Flex w="100%" justify="center" mt={10} mb={-30}>
                <Button w="49%" h={45} bg="#5682B4" c="#D5EAF5" fz="18px" onClick={onClick}
                        leftSection={<EditIcon style={{marginRight: "15px", transform: 'rotate(90deg)' }}/>}
                >
                    Daten bearbeiten
                </Button>
            </Flex>
        </Flex>
    );
}
 
export default AccountDetailsDropdown;