import { Box, Flex, Loader, Text } from "@mantine/core";
import MyWishlist from "./MyWishlist";
import FilterBox from "../elements/FilterBox";
import { useState, useEffect } from "react";
import FilterList from "../elements/FilterList";
import { useUser } from "../../UserContext";
import { useRef } from "react";

const MyPresents = ({token}) => {

    const [loading, setLoading] = useState(false);
    const [wishes, setWishes] = useState();
    const [wishesWithoutFilter, setWishesWithoutFilter] = useState();
    const [filterList, setFilterList] = useState([]);

    const fetchData = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            const categoryCount = filterList.filter(filter => filter.filterName == "Kategorie").length
        
            filterList?.forEach(filter => {
                if (filter.filterName === 'Kategorie') {
                    categoryCount > 1 ? params.append("categories", filter.filterValueID) : params.append("category", filter.filterValueID)
                }
                if (filter.filterName === "Event"){
                    params.append("eventType", filter.filterValueID)
                }
                if (filter.filterName === 'Titel') {
                    params.append("title", filter.filterValue)
                }
                if (filter.filterName === "Preis") {
                    const parts = (filter.filterValue).split(" - ");
                    const minPrice = parseInt(parts[0]);
                    const maxPrice = parseInt(parts[1]);
                    params.append("minPrice", minPrice)
                    params.append("maxPrice", maxPrice)
                }
                if (filter.filterValueID == 'FAVORITE'){
                    params.append("isFavorite", "true")
                }
                console.log(params.toString())
            })

            const url = params.toString() 
                ? `${process.env.REACT_APP_API_URL}/wishlist/items?${params.toString()}`
                : `${process.env.REACT_APP_API_URL}/wishlist/items`

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const response2 = await fetch (`${process.env.REACT_APP_API_URL}/wishlist/items`,{
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
            const data2 = await response2.json()
            setWishes(data)
            setWishesWithoutFilter(data2)
        } catch (error) {
            console.error(`Error fetching url:`, error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            fetchData()
        }
    }, [token, filterList])

    return (  
        <Flex justify="space-between" h="100%">
            <Box w="80vw" mx="30px" my="15px">
                <Flex justify="space-between">
                    <Text c="#5682B4" size="40px" mb={20}>
                        Meine Wünsche:
                    </Text> 
                </Flex>
                {filterList.length > 0 && <FilterList filterList={filterList}/>}
                {loading ?
                    <Flex h="80%" justify="center" align="center">
                        <Loader size={50} color="#5682B4" type="bars"></Loader>
                    </Flex>
                :
                    <MyWishlist wishes={wishes} onSuccess={fetchData} token={token} filterList={filterList} />
                }
            </Box>
            <FilterBox wishes={wishes} wishesWithoutFilter={wishesWithoutFilter} token={token} onSuccess={fetchData} filterList={filterList} setFilterList={setFilterList} owner="true"/>
        </Flex>
    );
}
 
export default MyPresents;