import { Flex, Text, Checkbox } from "@mantine/core";

const FavoritFilter = ({addFilter}) => {
    return (  
        <Flex direction="column" mb={20}>
            <Text c="#5682B4" fz={17} fw={700} mb={10} style={{cursor: "default"}}>
                Favoriten
            </Text>
            <Flex justify="center">
                <Checkbox
                    onChange={() => addFilter(null, "Nur Favoriten anzeigen", "FAVORITE")}
                    color="#5682B4"
                    c="#5682B4"
                    label="Nur Favoriten anzeigen"
                    styles={{
                        input: { cursor: "pointer" },
                        label: { cursor: "pointer" }
                    }}
                />
            </Flex>
        </Flex>
    );
}
 
export default FavoritFilter;