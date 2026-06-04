import { Grid, Flex, Text } from "@mantine/core";
import WishBox from "./WishBox";

const Wishlist = ({wishes, onSuccess, searchedUser, token, filterList}) => {
    return (  
        <Grid mt={10}>
            {wishes?.length > 0 ?
                wishes?.map((wish) => (
                    <Grid.Col span={3}>
                        <WishBox wish={wish} onSuccess={onSuccess} searchedUser={searchedUser} token={token}/>
                    </Grid.Col>      
                ))
            :
                <Flex direction="column" w="100%" h="70vh" justify="center" align="center">
                    {filterList.length > 0 ?
                        <>
                            <Text c="#5682B4" fz={40} ta="center" w="50%">Keine passenden Wünsche zu den gewählten Filtern gefunden.</Text>
                        </>
                    :
                        <>
                            <Text c="#5682B4" fz={40}>Diese Wunschliste ist leer.</Text>
                        </>
                    }
                </Flex>   
            }
        </Grid>
    );
}
 
export default Wishlist;