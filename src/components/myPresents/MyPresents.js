import { Box, Flex, Text } from "@mantine/core";
import MyWishlist from "./MyWishlist";
import FilterBox from "../elements/FilterBox";
import { useState, useEffect } from "react";
import FilterList from "../elements/FilterList";
import { useUser } from "../../UserContext";
import { useRef } from "react";

const MyPresents = ({token}) => {

    const [wishes, setWishes] = useState();
    const [wishesWithoutFilter, setWishesWithoutFilter] = useState();
    const [filterList, setFilterList] = useState([]);
    const wishesWithoutFilterSet = useRef(false);

    const fetchData = async () => {
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
                ? `http://localhost:8080/wishlist/items?${params.toString()}`
                : `http://localhost:8080/wishlist/items`

            const response = await fetch(url, {
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
            if (!params.toString() && !wishesWithoutFilterSet.current) {
                setWishesWithoutFilter(data)
                wishesWithoutFilterSet.current = true;
            }
            setWishes(data)
        } catch (error) {
            console.error(`Error fetching url:`, error)
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
                <MyWishlist wishes={wishes} onSuccess={fetchData} token={token}/>
            </Box>
            <FilterBox wishes={wishes} wishesWithoutFilter={wishesWithoutFilter} token={token} onSuccess={fetchData} filterList={filterList} setFilterList={setFilterList} owner="true"/>
        </Flex>
    );
}
 
export default MyPresents;