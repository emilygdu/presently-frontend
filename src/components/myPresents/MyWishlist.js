import { Flex, Grid, Text } from "@mantine/core";
import MyWishBox from "./MyWishBox";

const MyWishlist = ({wishes, onSuccess, token}) => {
    return (  
        <Grid mt={10}>
            {wishes?.length > 0 ?
                wishes.map((wish) => (
                    <Grid.Col span={3} key={wish.id}>
                        <MyWishBox wish={wish} onSuccess={onSuccess} owner="true" token={token}/>
                    </Grid.Col>
                ))
            :
                <Flex direction="column" w="100%" h="70vh" justify="center" align="center">
                    <Text c="#5682B4" fz={40}>Deine Wunschliste ist aktuell leer.</Text>
                    <Text c="#5682B4" ta="center" w="70%" fz={40}>Füge Wünsche hinzu, um deinen Freunden die Geschenkesuche zu erleichtern</Text>
                </Flex>    
            }
        </Grid>
    );
}
 
export default MyWishlist;