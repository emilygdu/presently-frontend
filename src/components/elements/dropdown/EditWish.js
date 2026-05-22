import { Flex, Title, Button } from "@mantine/core";
import InputRow from "./InputRow";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { useUser } from "../../../UserContext";

const EditWish = ({ wish, onClose, onSuccess, token }) => {

    const categoryData = ["Haushalt", "Kleidung", "Kosmetik", "Lebensmittel", "Reisen", "Sport", "Technik", "Sonstiges"]
    const eventData = ["Geburtstag", "Hochzeit", "Weihnachten", "Abschluss"]

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
    const events = [
        {name: "Geburtstag", id: "BIRTHDAY"},
        {name: "Hochzeit", id: "WEDDING"},
        {name: "Weihnachten", id: "CHRISTMAS"},
        {name: "Abschluss", id: "GRADUATION"}
    ]

    const [errors, setErrors] = useState({});

    const [title, setTitle] = useState(wish.title);
    const [link, setLink] = useState(wish.productUrl);
    const [price, setPrice] = useState(wish.price);
    const [category, setCategory] = useState("");
    const [event, setEvent] = useState("");
    const [picture, setPicture] = useState(wish.imageUrl);
    const [favorit, setFavorit] = useState(wish.isFavorite);

    const validate = () => {
        const newErrors = {};
        if (!title) newErrors.title = "Titel ist erforderlich";
        if (!price) newErrors.price = "Preis ist erforderlich";
        if (isNaN(parseFloat(price))) newErrors.price = "Preis muss eine Zahl sein";
        if (!category) newErrors.category = "Kategorie ist erforderlich";
        if (!link) newErrors.link = "Link ist erforderlich";
        return newErrors;
    }

    useEffect(() => {
        if (categorys) setCategory(categorys.find((c) => c.id == wish.productCategory)?.name);
        if (events) setEvent(events.find((e) => e.id == wish.eventType)?.name);
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/wishlist/items/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            onSuccess()
            onClose()
        } catch (error) {
            console.error("Error deleting wish:", error);
        }
    }

    const handleSubmit = async (id) => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/wishlist/items/${id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productCategory: categorys?.find((c) => c.name == category).id,
                    eventType: events?.find((e) => e.name == event)?.id ?? null,      
                    title: title,
                    price: parseFloat(price.toString().replace(',', '.')),
                    isFavorite: favorit,
                    isBought: wish.isBought,
                    imageUrl: picture,
                    productUrl: link
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            onClose()
            onSuccess()
        } catch (error) {
            console.error("Error posting wish:", error);
        }
    }

    return (  
        <Flex w="40vw" h="70vh" direction="column" align="center" justify="center">
            <Title c="#5682B4" fz={35} mb={30} mt={-30}>
                Wunsch bearbeiten oder löschen
            </Title>
            <InputRow title="Titel" inputType="text" value={title} onChange={setTitle} error={errors.title}/>
            <InputRow title="Link" inputType="text" value={link} onChange={setLink} error={errors.link}/>
            <InputRow title="Preis" inputType="text" value={price} onChange={setPrice} error={errors.price}/>
            <InputRow title="Kategorie" inputType="select" selectData={categoryData} value={category} onChange={setCategory} error={errors.category}/>
            <InputRow title="Event" inputType="select" selectData={eventData} value={event} onChange={setEvent}/>
            <InputRow title="Bild" inputType="text" value={picture} onChange={setPicture}/>
            <InputRow title="Favorit" inputType="check" value={favorit} onChange={setFavorit}/>
            <Flex w="100%" justify="space-between" mt={10} mb={-30}>
                <Button w="49%" h={45} bg="#F5F4D7" c="#5682B4" fz="18px"
                        leftSection={<DeleteIcon />} onClick={() => handleDelete(wish.id)}
                >
                    Wunsch löschen
                </Button>
                <Button w="49%" h={45} bg="#5682B4" c="#D5EAF5" fz="18px"
                        leftSection={<EditIcon />} onClick={() => handleSubmit(wish.id)}
                >
                    Wunsch bearbeiten
                </Button>
            </Flex>
        </Flex>
    );
}
 
export default EditWish;