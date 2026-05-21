import { Badge, Flex, Text } from "@mantine/core";

const FilterList = ({filterList}) => {
    return (  
        <Flex align="center" wrap="wrap" gap={5}>
            <Text c="#5682B4">aktive Filter:</Text>
            {filterList.map((filter) => (
                <Badge px={10} bg="#D5EAF5" c="#5682B4">
                    {filter.filterName != null && `${filter.filterName}: `}{filter.filterValue}
                </Badge>
            ))}
        </Flex>
    );
}
 
export default FilterList;