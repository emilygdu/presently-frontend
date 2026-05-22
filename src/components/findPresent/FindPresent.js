import { Flex, Box, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import FilterBox from "../elements/FilterBox";
import FilterList from "../elements/FilterList";
import Wishlist from "./Wishlist";

const FindPresent = ({searchedUser}) => {

    const [wishes, setWishes] = useState();
    const [filterList, setFilterList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/wishes")
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            setWishes(data.filter((wish) => wish.fk_uid == searchedUser.id))
        } catch (error) {
            console.error(`Error fetching url:`, error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (  
        <Flex justify="space-between" h="100%">
            <Box w="80vw" mx="30px" my="15px">
                <Flex justify="space-between">
                    <Text c="#5682B4" size="40px" mb={20}>
                        Wünsche von {searchedUser?.username}:
                    </Text>  
                </Flex>
                {filterList.length > 0 && <FilterList filterList={filterList}/>}
                <Wishlist wishes={wishes} onSuccess={fetchData} searchedUser={searchedUser}/>
            </Box>
            <FilterBox wishes={wishes} onSuccess={fetchData} filterList={filterList} setFilterList={setFilterList} user={searchedUser?.id}/>
        </Flex>
    );
}
 
export default FindPresent;