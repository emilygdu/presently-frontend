import { Flex, Text, RangeSlider } from "@mantine/core";

const PriceFilter = ({addFilter, minPrice, maxPrice, priceRange, setPriceRange}) => {

    return (  
        <Flex direction="column" mb={50}>
            <Text c="#5682B4" fz={17} fw={700} mb={10} style={{cursor: "default"}}>
                Preis
            </Text>
            <RangeSlider onChange={(value) => {
                            setPriceRange(value);
                            addFilter("Preis", `${value[0]}€ - ${value[1]}€`);
                         }}
                         color="#5682B4" value={priceRange} 
                         min={minPrice} max={maxPrice} labelAlwaysOn  
                         label={(value) => (
                             <Text c="#5682B4" bg="#F5F4D7" fz={12}>{value} €</Text>
                         )}
                         styles={{
                            label: {
                                backgroundColor: "#F5F4D7",
                                color: "#5682B4",
                                border: "none",
                                top: "100%",
                                transform: "translateY(10px)"
                            }
                         }}
            />
        </Flex>
    );
}
 
export default PriceFilter;