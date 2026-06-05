import { Flex, Text, Select, Checkbox, TextInput, PasswordInput } from "@mantine/core";
import CreateIcon from '@mui/icons-material/Create';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InputRow = ({title, inputType, selectData, value, onChange, error}) => {

    return (  
        <Flex w="100%" my={10} align="center" justify="space-between">
            <Text c="#5682B4" fz={25}>{title}:</Text>
            {inputType == "text" && 
                <TextInput w="50%" placeholder={title == "Bild" ? "Bildlink eingeben..." : `${title.replace("*", "")} eingeben...`}
                    rightSection={<CreateIcon style={{ color: '#5682B4' }}/>} 
                    value={value} onChange={(e) => onChange(e.target.value)}
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
                    error={error}
                />
            }
            {inputType == "password" && 
                <PasswordInput w="50%" placeholder={`${title.replace("*", "")} eingeben...`}
                    value={value} onChange={(e) => onChange(e.target.value)}
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
                    error={error}
                />
            }
            {inputType == "select" && 
                <Select w="50%" placeholder={`${title.replace("*", "")} wählen...`}
                        comboboxProps={{ withinPortal: false }}
                        data={selectData}
                        rightSection={<ExpandMoreIcon style={{ color: '#5682B4' }}/>} 
                        value={value}
                        onChange={onChange} 
                        styles={{
                            input: {
                                backgroundColor: '#F5F4D7',
                                borderColor: '#F5F4D7',
                                color: "#5682B4"
                            },
                            placeholder: {
                                color: '#5682B4',
                            },
                            dropdown: {
                                backgroundColor: "#FEFDE5",
                                borderColor: '#5682B4',
                                color: '#5682B4',
                            }
                        }}
                        error={error}
                />
            }
            {inputType == "check" &&
                <Flex w="50%" justify="center" align="center">
                    <Checkbox size={30} color="#5682B4"
                              checked={value}
                              onChange={(e) => onChange(e.currentTarget.checked)}
                    />
                </Flex>    
            }
        </Flex>
    );
}
 
export default InputRow;