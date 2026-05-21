import { Flex, Text, TextInput } from "@mantine/core";
import SearchIcon from '@mui/icons-material/Search';

const TitleFilter = ({addFilter}) => {
    return (  
        <Flex direction="column" mb={20}>
            <Text c="#5682B4" fz={17} fw={700} mb={10} style={{cursor: "default"}}>
                Titel suchen
            </Text>
            <TextInput onChange={(e) => addFilter("Titel", e.target.value)} placeholder="Suche nach einem Wunschtitel" name="titlesearch" 
                       rightSection={<SearchIcon style={{ color: '#5682B4' }}/>} style={{cursor:"pointer"}}
                        styles={{
                            input: {
                                backgroundColor: '#F5F4D7',
                                borderColor: '#F5F4D7',
                                color: "#5682B4"
                            },
                            placeholder: {
                                color: '#5682B4',
                            }
                        }}
            />
        </Flex>
    );
}
 
export default TitleFilter;