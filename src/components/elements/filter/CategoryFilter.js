import { Badge, Box, Flex, Grid, Text } from "@mantine/core";
import { useState, useEffect } from "react";

const CategoryFilter = ({wishes, wishesWithoutFilter, addFilter, filterList}) => {

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
    
    console.log(wishes)

    return (  
        <Flex direction="column" mb={20}>
            <Text c="#5682B4" fz={17} fw={700} mb={10} style={{cursor: "default"}}>
                Kategorien
            </Text>
            <Grid>
                {categorys?.map((category) => 
                    <Grid.Col span={6} mb={-5}>
                        <Flex justify="space-between" align="center" pl={5} h={20} onClick={() => addFilter("Kategorie", category.name, category.id)} style={{cursor: "pointer", borderRadius: "20px"}}
                              bg={filterList.some((fL) => fL.filterName == "Kategorie" && fL.filterValue == category.name) ? "#5682B4" : "#5682b400"}>
                            <Text fz={13} c={filterList?.some((fL) => fL.filterName == "Kategorie" && fL.filterValue == category.name) ? "#D5EAF5" : "#5682B4"}>{category.name}</Text>
                            <Badge fz={10} w={30} bg="#F5F4D7" c="#5682B4"
                                   styles={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                {wishesWithoutFilter?.filter((w) => w.productCategory == category.id).length}
                            </Badge>
                        </Flex>
                    </Grid.Col>
                )}
            </Grid>
        </Flex>
    );
}
 
export default CategoryFilter;