import { Flex, Text, Badge } from "@mantine/core";
import { useState, useEffect } from "react";

const EventFilter = ({wishes, wishesWithoutFilter, addFilter, filterList}) => {

    const events = [
        {name: "Geburtstag", id: "BIRTHDAY"},
        {name: "Hochzeit", id: "WEDDING"},
        {name: "Weihnachten", id: "CHRISTMAS"},
        {name: "Abschluss", id: "GRADUATION"}
    ]

    return (  
        <Flex direction="column" h="22vh">
            <Text c="#5682B4" fz={17} fw={700} mb={5} style={{cursor: "default"}}>
                Events
            </Text>
            <Flex  justify="center">
                <Flex direction="column" w="50%">
                    {events?.map((event) => 
                        <Flex justify="space-between" mb={15} pl={5} onClick={() => addFilter("Event", event.name, event.id)} style={{cursor: "pointer", borderRadius: "20px"}}
                              bg={filterList.some((fL) => fL.filterName == "Event" && fL.filterValue == event.name) ? "#5682B4" : "#5682b400"}
                        >
                            <Text fz={13} c={filterList.some((fL) => fL.filterName == "Event" && fL.filterValue == event.name) ? "#D5EAF5" : "#5682B4"}>
                                {event.name}
                            </Text>
                            <Badge fz={10} w={30} bg="#F5F4D7" c="#5682B4"
                                    styles={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                {wishesWithoutFilter?.filter((w) => w.eventType == event.id).length}
                            </Badge>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}
 
export default EventFilter;