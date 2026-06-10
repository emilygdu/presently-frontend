import { Box, Button, Divider, Popover } from "@mantine/core";
import AddIcon from '@mui/icons-material/Add';
import AddWish from "./dropdown/AddWish";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";
import CategoryFilter from "./filter/CategoryFilter";
import EventFilter from "./filter/EventFilter";
import PriceFilter from "./filter/PriceFilter";
import TitleFilter from "./filter/TitleFilter";
import FavoritFilter from "./filter/FavoritFilter";
import { useNavigate } from "react-router-dom";

const FilterBox = ({wishes, wishesWithoutFilter, token, onSuccess, filterList, setFilterList, owner}) => {

    const navigate = useNavigate();

    const [opened, setOpened] = useState()

    const [priceRange, setPriceRange] = useState([0, 500]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);

    console.log(filterList)

    useEffect(() => {
        if (wishesWithoutFilter && wishesWithoutFilter.length > 0) {
            const min = Math.min(...wishesWithoutFilter.map((wish) => wish.price));
            const max = Math.max(...wishesWithoutFilter.map((wish) => wish.price));
            setMinPrice(min);
            setMaxPrice(max);
        }
    }, [wishesWithoutFilter]);

    useEffect(() => {
        if (wishes && wishes.length > 0) {
            if (filterList.find((fl) => fl.filterName == "Preis")){
                const filterValue = filterList.find((fl) => fl.filterName == "Preis").filterValue  // ← .filterValue
                const [min, max] = filterValue.replace(/€/g, "").split(" - ").map(Number)
                setPriceRange([min, max]);
            }
            else{
                const min = Math.min(...wishes.map((wish) => wish.price));
                const max = Math.max(...wishes.map((wish) => wish.price));
                setPriceRange([min, max]);
            }
        }
    }, [wishes]);

    const addFilter = (name, value, valueID) => {
        if (name == "Preis" || name == "Titel"){
            if(value == ""){
                setFilterList(filterList.filter((el) => !(el.filterName == name)))
                return
            }
            if(value == `${Math.floor(minPrice)}€ - ${Math.floor(maxPrice)}€`){
                setFilterList(filterList.filter((el) => !(el.filterName == name)))
                return
            }
            setFilterList(filterList.filter((el) => !(el.filterName == name)))
            setFilterList((prev) => [...prev, { filterName: name, filterValue: value }])
            return
        }
        if(!filterList.some((el) => el.filterName == name && el.filterValue == value)){
            setFilterList((prev) => [...prev, { filterName: name, filterValue: value, filterValueID: valueID }])
            return
        }
        setFilterList(filterList.filter((el) => !(el.filterName == name && el.filterValue == value)))
    }

    return (  
        <Box w="23vw" h="90vh" bg="#D5EAF5" px="30px" py="15px" style={{ position: "sticky", top: "10vh", alignSelf: "flex-start" }}>
            <CategoryFilter wishes={wishes} wishesWithoutFilter={wishesWithoutFilter} addFilter={addFilter} filterList={filterList} />
            <Divider size={2} color="#5682B4"/>
            <EventFilter wishes={wishes} wishesWithoutFilter={wishesWithoutFilter} addFilter={addFilter} filterList={filterList} />
            <Divider size={2} color="#5682B4"/>
            <FavoritFilter addFilter={addFilter}/>
            <Divider size={2} color="#5682B4"/>
            <PriceFilter addFilter={addFilter} minPrice={minPrice} maxPrice={maxPrice} priceRange={priceRange} setPriceRange={setPriceRange}/>
            <Divider size={2} color="#5682B4"/>
            <TitleFilter addFilter={addFilter} />
            <Divider size={2} color="#5682B4"/>
            {owner ? 
                <Popover opened={opened} onChange={setOpened} withOverlay overlayProps={{ zIndex: 10, blur: '5px' }} zIndex={11}>
                    <Popover.Target>
                        <Button onClick={() => setOpened(true)} h="10%" fz={20} mt={15} w="100%" bg="#F5F4D7" c="#5682B4" radius={15} leftSection={<AddIcon sx={{alignItems: "center", fontSize: 35 }} />}>
                            Wunsch hinzufügen
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown style={{position: "fixed", top: "55%", left: "50%", transform: "translate(-50%, -50%)",
                                            border: "7px solid #5682B4", backgroundColor: "#FEFDE5", borderRadius: 12, padding: 20}}>
                        <AddWish onClose={() => setOpened(false)} onSuccess={onSuccess} token={token}/>
                    </Popover.Dropdown>
                </Popover>
            :
                <Button h="10%" fz={20} mt={15} w="100%" bg="#F5F4D7" c="#5682B4" radius={15} leftSection={<ArrowBackIcon sx={{alignItems: "center", fontSize: 35 }} />}
                        styles={{ label: { whiteSpace: 'normal' } }} onClick={() => navigate(`/geschenkeFinden`)}
                >
                    Zurück zur Benutzersuche
                </Button>
            }
        </Box>
    );
}
 
export default FilterBox;